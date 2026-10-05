import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Loader2, Phone, Building2, Briefcase, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TOTAL = 7;

const OTHER_SERVICES = [
  "Estratégia Digital",
  "Tráfego Pago",
  "Social Media",
  "Branding",
  "Audiovisual",
  "Sites e Landing Pages",
];

const REVENUES = [
  "Até R$ 30 mil/mês",
  "R$ 30 mil a R$ 100 mil/mês",
  "R$ 100 mil a R$ 500 mil/mês",
  "Acima de R$ 500 mil/mês",
  "Prefiro não informar",
];

const URGENCIES = [
  "Quanto antes, melhor",
  "Nos próximos 30 dias",
  "Estou estudando opções",
];

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  formType?: string;
}

type QuizData = {
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  revenue: string;
  urgency: string;
  agreed: string;
};

const cleanPhone = (value: string) => value.replace(/\D/g, "");
const maskPhone = (value: string) => {
  const digits = cleanPhone(value);
  if (digits.length > 11) return value.slice(0, 15);
  let out = digits;
  if (digits.length > 2) out = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length > 7) out = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  return out;
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const STORAGE_KEY = "synlua_quiz_draft";

const QuizModal = ({ open, onClose, formType = "quiz" }: QuizModalProps) => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [otherOpen, setOtherOpen] = useState(false);

  const [data, setData] = useState<QuizData>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.data) return parsed.data as QuizData;
        }
      } catch {
        /* ignore */
      }
    }
    return {
      name: "",
      phone: "",
      email: "",
      company: "",
      service: "",
      revenue: "",
      urgency: "",
      agreed: "",
    };
  });

  // Retoma o rascunho da mesma visita (etapa + id do lead parcial)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.leadId) setLeadId(parsed.leadId);
      if (typeof parsed?.step === "number" && parsed.step >= 1 && parsed.step <= TOTAL) setStep(parsed.step);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || done) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step, leadId }));
    } catch {
      /* ignore */
    }
  }, [data, step, leadId, done]);

  const set = <K extends keyof QuizData>(key: K, value: QuizData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (submitError) setSubmitError(null);
  };


  const canAdvance = () => {
    switch (step) {
      case 1:
        return data.name.trim().length >= 2;
      case 2:
        return cleanPhone(data.phone).length >= 11;
      case 3:
        return validateEmail(data.email);
      case 4:
        return data.company.trim().length >= 2;
      case 5:
        return data.service !== "";
      case 6:
        return data.revenue !== "" && data.urgency !== "";
      case 7:
        return data.agreed !== "";
      default:
        return false;
    }
  };

  // Salva o lead assim que temos nome + WhatsApp, para não perder quem abandona no meio
  const capturePartialLead = async () => {
    if (leadId) return;
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined;
    if (!id) return;
    try {
      const { error } = await supabase.from("form_submissions").insert({
        id,
        name: data.name.trim(),
        phone: cleanPhone(data.phone),
        email: "",
        status: "partial",
        form_type: formType,
      });
      if (error) throw error;
      setLeadId(id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Partial lead error:", e);
    }
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    if (step === 2 && next === 3) void capturePartialLead();
  };

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const onCloseReset = () => {
    if (submitting) return;
    onClose();
    if (!done) return;
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setSubmitError(null);
      setLeadId(null);
      setOtherOpen(false);
      setData({
        name: "",
        phone: "",
        email: "",
        company: "",
        service: "",
        revenue: "",
        urgency: "",
        agreed: "",
      });
    }, 300);
  };

  const submit = async (agreedValue?: string) => {
    setSubmitting(true);
    setSubmitError(null);

    const agreement = agreedValue || data.agreed;

    const notes = [
      data.urgency && `Urgência: ${data.urgency}`,
      agreement && `Contato em 30 minutos: ${agreement}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const row = {
      name: data.name.trim(),
      phone: cleanPhone(data.phone),
      email: data.email.trim(),
      company: data.company.trim() || null,
      service_type: data.service || null,
      revenue: data.revenue || null,
      notes: notes || null,
      form_type: formType,
      status: "new",
    };

    const payload = {
      ...row,
      service: data.service,
      urgency: data.urgency,
      agreed: agreement,
    };

    try {
      if (leadId) {
        const { data: done, error } = await supabase.rpc("complete_lead", {
          p_id: leadId,
          p_name: row.name,
          p_phone: row.phone,
          p_email: row.email,
          p_company: row.company,
          p_service_type: row.service_type,
          p_revenue: row.revenue,
          p_notes: row.notes,
          p_form_type: row.form_type,
        });
        if (error) throw error;
        // Se o lead parcial não existir mais (ex.: já concluído), grava como novo
        if (!done) {
          const { error: insertError } = await supabase.from("form_submissions").insert(row);
          if (insertError) throw insertError;
        }
      } else {
        const { error } = await supabase.from("form_submissions").insert(row);
        if (error) throw error;
      }

      try {
        await supabase.functions.invoke("notify-lead-telegram", { body: payload });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Notification error:", e);
      }

      clearDraft();
      setDone(true);
      setTimeout(() => {
        onClose();
        toast.success(
          "Recebemos suas informações! Nosso time entrará em contato em até 30 minutos pelo WhatsApp."
        );
      }, 1200);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e);
      setSubmitError(e?.message || "Não foi possível enviar. Tente novamente.");
      toast.error("Erro ao enviar. Verifique sua conexão e tente novamente.");
      setSubmitting(false);
    }

  };

  const questions: Record<number, { title: string; body: React.ReactNode }> = {
    1: {
      title: "Qual é o seu nome?",
      body: (
        <div className="space-y-4">
          <Input
            autoFocus
            placeholder="Ex: João Silva"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canAdvance() && go(2)}
            className="bg-[#0c0c16] border-[#1f1f35] text-[#EDEDED] placeholder:text-[#555] h-14 rounded-xl focus:border-[#8B5CF6]/60"
          />
        </div>
      ),
    },
    2: {
      title: "Qual é o seu WhatsApp?",
      body: (
        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <Input
              autoFocus
              type="tel"
              placeholder="(11) 99999-9999"
              value={data.phone}
              onChange={(e) => set("phone", maskPhone(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && go(3)}
              className="bg-[#0c0c16] border-[#1f1f35] text-[#EDEDED] placeholder:text-[#555] h-14 rounded-xl pl-11 focus:border-[#8B5CF6]/60"
            />
          </div>
        </div>
      ),
    },
    3: {
      title: "Qual é o seu e-mail?",
      body: (
        <div className="space-y-4">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <Input
              autoFocus
              type="email"
              placeholder="seu@email.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && go(4)}
              className="bg-[#0c0c16] border-[#1f1f35] text-[#EDEDED] placeholder:text-[#555] h-14 rounded-xl pl-11 focus:border-[#8B5CF6]/60"
            />
          </div>
        </div>
      ),
    },
    4: {
      title: "Qual o nome da sua empresa?",
      body: (
        <div className="space-y-4">
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <Input
              placeholder="Nome da empresa"
              value={data.company}
              onChange={(e) => set("company", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canAdvance() && go(5)}
              className="bg-[#0c0c16] border-[#1f1f35] text-[#EDEDED] placeholder:text-[#555] h-14 rounded-xl pl-11 focus:border-[#8B5CF6]/60"
            />
          </div>
        </div>
      ),
    },
    5: {
      title: "Qual serviço você está buscando?",
      body: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {["Marketing Completo", "Outro serviço"].map((s) => {
              const active = s === "Outro serviço" ? otherOpen : data.service === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    if (s === "Outro serviço") {
                      setOtherOpen(true);
                      set("service", "");
                    } else {
                      setOtherOpen(false);
                      set("service", s);
                    }
                  }}
                  className={`px-4 py-3 rounded-full text-sm border transition-all ${
                    active
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#EDEDED]"
                      : "border-[#1f1f35] text-[#8a8a95] hover:border-[#8B5CF6]/50 hover:text-[#EDEDED]/80"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <AnimatePresence initial={false}>
            {otherOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {OTHER_SERVICES.map((s) => {
                    const active = data.service === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("service", s)}
                        className={`px-4 py-3 rounded-full text-sm border transition-all ${
                          active
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#EDEDED]"
                            : "border-[#1f1f35] text-[#8a8a95] hover:border-[#8B5CF6]/50 hover:text-[#EDEDED]/80"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    6: {
      title: "Faturamento mensal e urgência",
      body: (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#8a8a95] mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Faturamento mensal aproximado
            </p>
            <div className="flex flex-wrap gap-2.5">
              {REVENUES.map((r) => {
                const active = data.revenue === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set("revenue", r)}
                    className={`px-4 py-2.5 rounded-full text-sm border transition-all ${
                      active
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#EDEDED]"
                        : "border-[#1f1f35] text-[#8a8a95] hover:border-[#8B5CF6]/50 hover:text-[#EDEDED]/80"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm text-[#8a8a95] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Quando precisa começar?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {URGENCIES.map((u) => {
                const active = data.urgency === u;
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => set("urgency", u)}
                    className={`px-4 py-2.5 rounded-full text-sm border transition-all ${
                      active
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#EDEDED]"
                        : "border-[#1f1f35] text-[#8a8a95] hover:border-[#8B5CF6]/50 hover:text-[#EDEDED]/80"
                    }`}
                  >
                    {u}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    7: {
      title: "Nosso time entrará em contato com você nos próximos 30 minutos. Você está de acordo?",
      body: (
        <div className="space-y-5">
          <p className="text-sm text-[#8a8a95]">
            Se estiver de acordo, confirme abaixo. Caso contrário, é só fechar essa janela.
          </p>
          <button
            type="button"
            disabled={submitting}
            onClick={() => {
              const agreed = "Sim, estou de acordo";
              set("agreed", agreed);
              submit(agreed);
            }}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-medium tracking-wide shadow-[0_12px_36px_-12px_rgba(139,92,246,0.65)] transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                Sim, estou de acordo
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      ),
    },
  };

  if (typeof document === "undefined") return null;

  const progress = useMemo(() => (step / TOTAL) * 100, [step]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/80"
          onClick={onCloseReset}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#08080f] border border-[#1f1f35] rounded-[24px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(139,92,246,0.4)]"
          >
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 w-72 h-72 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />

            {done ? (
              <div className="relative px-6 py-16 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" />
                </div>
                <h3 className="mt-5 text-2xl font-light text-[#EDEDED]">Tudo certo!</h3>
                <p className="mt-2 text-[#808080]">Nosso time entrará em contato em até 30 minutos pelo WhatsApp.</p>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center justify-between px-5 sm:px-7 pt-5">
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button type="button" onClick={() => go(step - 1)} className="text-[#8a8a95] hover:text-[#EDEDED] transition-colors" aria-label="Voltar">
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    )}
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#8B5CF6]">
                      Etapa {step} de {TOTAL}
                      <span className="ml-2 normal-case tracking-normal text-[#6f6f7d]">· menos de 1 minuto</span>
                    </span>

                  </div>
                  <button type="button" onClick={onCloseReset} className="text-[#8a8a95] hover:text-[#EDEDED] transition-colors" aria-label="Fechar">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mx-5 sm:mx-7 mt-4 h-[3px] rounded-full bg-[#1a1a2e] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>

                <div className="px-5 sm:px-7 pt-6 pb-4 overflow-hidden">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      initial={{ opacity: 0, x: dir * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: dir * -40 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <h3 className="text-[clamp(1.25rem,4.5vw,1.6rem)] font-light text-[#EDEDED] leading-snug mb-5">
                        {questions[step].title}
                      </h3>
                      {questions[step].body}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-5 sm:mx-7 mb-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium">Erro ao enviar</p>
                      <p className="text-red-200/70 text-xs">{submitError}</p>
                    </div>
                  </motion.div>
                )}

                {step !== TOTAL && (
                  <div className="px-5 sm:px-7 pb-6 flex items-center gap-3">
                    <button
                      type="button"
                      disabled={!canAdvance() || submitting}
                      onClick={() => go(step + 1)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-medium tracking-wide shadow-[0_12px_36px_-12px_rgba(139,92,246,0.65)] transition-all active:scale-[0.98] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed overflow-hidden relative"
                    >
                      <>
                        Avançar
                        <ArrowRight className="w-4 h-4" />
                      </>
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default QuizModal;

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Instagram, User, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";

const SupplierOnboarding = () => {
  const [form, setForm] = useState({ name: "", instagram: "", niche: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));
  const isValid = form.name.trim() && form.instagram.trim() && form.niche.trim();

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await supabase.from("form_submissions").insert({
        name: form.name.trim(),
        phone: "",
        email: "",
        social_media_handle: form.instagram.trim(),
        segment: form.niche.trim(),
        form_type: "supplier",
      });
      try {
        await supabase.functions.invoke('notify-lead-telegram', {
          body: {
            name: form.name.trim(),
            social_media_handle: form.instagram.trim(),
            segment: form.niche.trim(),
            form_type: "supplier",
          },
        });
      } catch (e) { console.error('notify error:', e); }
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#6366F1]/30">
        <SEOHead title="Cadastro Recebido | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." />
        <div className="w-full max-w-md px-6 text-center">
          <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-10" />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-14 h-14 text-[#6366F1] mx-auto mb-6" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extralight text-white/90 mb-4 tracking-tight">
            Cadastro recebido
          </h1>
          <p className="text-base text-white/50 font-light leading-relaxed">
            Obrigado! Recebemos seus dados e nossa equipe entrará em contato caso surja uma oportunidade alinhada ao seu perfil.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#6366F1]/30 py-16">
      <SEOHead title="Fornecedor | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." />
      <div className="w-full max-w-lg px-6">
        <div className="text-center mb-10">
          <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.35em] text-white/30 font-light mb-3">Fornecedor</p>
          <h1 className="text-2xl sm:text-3xl font-extralight text-white/90 tracking-tight mb-3">
            Cadastro de Fornecedor
          </h1>
          <p className="text-sm text-white/40 font-light">
            Preencha os dados abaixo para entrar no nosso ecossistema de parceiros.
          </p>
        </div>

        <div className="border border-white/[0.08] rounded-lg p-8 bg-white/[0.02] space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-base font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="Seu nome ou da empresa"
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">Instagram</label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-base font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="@seuinstagram"
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">Nicho</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={form.niche}
                onChange={(e) => updateField("niche", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-base font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="Ex: Moda, Beleza, Tech, Gastronomia..."
                maxLength={100}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full mt-2 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Cadastro"
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SupplierOnboarding;

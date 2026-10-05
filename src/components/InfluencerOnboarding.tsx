import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowDown, Loader2, CheckCircle2, Star, Zap, Shield, Users, Heart,
  Instagram, Phone, User, Globe, Clock, Sparkles, TrendingUp, Handshake,
  MessageCircle, Crown, Rocket
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import synluaLogoDark from "@/assets/synlua-logo.webp";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const nicheOptions = ["Moda", "Beleza", "Fitness", "Lifestyle", "Tech", "Gastronomia", "Saúde", "Educação", "Outro"];
const followerRanges = ["Até 10k", "10k – 50k", "50k – 100k", "100k – 500k", "500k+"];
const whatsappRedirectUrl = "https://wa.me/5511932267758?text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const timelineSteps = [
  { icon: User, title: "Cadastro e Análise", desc: "Analisamos seu perfil, nicho, engajamento e audiência para entender o melhor posicionamento." },
  { icon: TrendingUp, title: "Match com Marcas", desc: "Cruzamos seu perfil com as marcas do nosso ecossistema e identificamos as oportunidades ideais." },
  { icon: MessageCircle, title: "Proposta Personalizada", desc: "Você recebe uma proposta de publi sob medida, com escopo e briefing detalhado." },
  { icon: Handshake, title: "Negociação e Briefing", desc: "Alinhamos todos os detalhes — prazo, formato, entregáveis — para garantir uma execução impecável." },
  { icon: Sparkles, title: "Execução", desc: "Você cria o conteúdo e a marca aprova — todo o processo acompanhado de perto pela nossa equipe." },
];

const whyCards = [
  { icon: Globe, title: "Ecossistema Diversificado", desc: "Marcas de diversos nichos — moda, beleza, tech, alimentação e muito mais." },
  { icon: Star, title: "Propostas Personalizadas", desc: "Cada proposta é criada com base no seu perfil, audiência e estilo de conteúdo." },
  { icon: Shield, title: "Suporte Dedicado", desc: "Acompanhamento do início ao fim, com uma equipe focada no seu sucesso." },
  { icon: Heart, title: "Transparência Total", desc: "Condições justas e comunicação aberta em todas as etapas." },
  { icon: Users, title: "Relacionamento de Longo Prazo", desc: "Não é só uma publi — construímos parcerias contínuas e duradouras." },
  { icon: TrendingUp, title: "Crescimento Conjunto", desc: "Quanto mais você cresce, mais oportunidades aparecem dentro do ecossistema." },
];

const InfluencerOnboarding = () => {
  const [phase, setPhase] = useState<"form" | "loading" | "landing">("form");
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    instagram: "",
    niche: "",
    followers: "",
    didPubli: "",
  });

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const steps = [
    // Step 0: Name
    {
      title: "Seus dados",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">Nome completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="Seu nome"
              />
            </div>
          </div>
        </div>
      ),
      valid: form.name.trim() !== "",
    },
    // Step 1: Phone + Instagram
    {
      title: "Contato e perfil",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/30 mb-2 font-light">Instagram principal</label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text" value={form.instagram} onChange={(e) => updateField("instagram", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-3 text-white/80 text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-[#6366F1]/40 transition-colors"
                placeholder="@seuperfil"
              />
            </div>
          </div>
        </div>
      ),
      valid: form.phone.trim() !== "" && form.instagram.trim() !== "",
    },
    // Step 2: Niche
    {
      title: "Seu nicho",
      content: (
        <div className="grid grid-cols-3 gap-2">
          {nicheOptions.map((n) => (
            <button
              key={n} onClick={() => updateField("niche", n)}
              className={`p-3 rounded-lg border text-sm font-light transition-all duration-300 ${form.niche === n ? "border-[#6366F1]/60 bg-[#6366F1]/10 text-white/90" : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20"}`}
            >
              {n}
            </button>
          ))}
        </div>
      ),
      valid: form.niche !== "",
    },
    // Step 3: Followers
    {
      title: "Seguidores",
      content: (
        <div className="space-y-2">
          {followerRanges.map((r) => (
            <button
              key={r} onClick={() => updateField("followers", r)}
              className={`w-full p-4 rounded-lg border text-sm font-light text-left transition-all duration-300 ${form.followers === r ? "border-[#6366F1]/60 bg-[#6366F1]/10 text-white/90" : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20"}`}
            >
              {r}
            </button>
          ))}
        </div>
      ),
      valid: form.followers !== "",
    },
    // Step 4: Did publi before?
    {
      title: "Experiência",
      content: (
        <div className="space-y-3">
          <p className="text-base text-white/50 font-light mb-4">Você já fez publi/parceria com alguma marca antes?</p>
          {["Sim", "Não"].map((opt) => (
            <button
              key={opt} onClick={() => updateField("didPubli", opt)}
              className={`w-full p-4 rounded-lg border text-sm font-light text-left transition-all duration-300 ${form.didPubli === opt ? "border-[#6366F1]/60 bg-[#6366F1]/10 text-white/90" : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
      valid: form.didPubli !== "",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      (async () => {
        try {
          await supabase.from("form_submissions").insert({
            name: form.name, phone: form.phone, email: "",
            social_media_handle: form.instagram, segment: form.niche,
            form_type: "influencer",
            notes: `Seguidores: ${form.followers} | Já fez publi: ${form.didPubli}`,
          });
        } catch (e) { console.error(e); }
        try {
          await supabase.functions.invoke('notify-lead-telegram', {
            body: {
              name: form.name, phone: form.phone,
              social_media_handle: form.instagram, niche: form.niche,
              followers: form.followers, did_publi: form.didPubli,
              form_type: "influencer",
            },
          });
        } catch (e) { console.error(e); }
        setIsSubmitting(false);
        setPhase("loading");
        setTimeout(() => setPhase("landing"), 1500);
      })();
    }
  };

  // ─── LOADING ───
  if (phase === "loading") {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center">
        <SEOHead title="Processando | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." />
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-6 h-6 animate-spin text-[#6366F1]" />
          <p className="text-white/40 text-sm font-light">Processando seu cadastro...</p>
        </div>
      </main>
    );
  }

  // ─── FORM ───
  if (phase === "form") {
    const current = steps[step];
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#6366F1]/30">
        <SEOHead title="Influenciadora | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." />
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-10">
            <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-8" />
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-[#6366F1]" : "bg-white/[0.08]"}`} />
            ))}
          </div>

          <div className="border border-white/[0.08] rounded-lg p-8 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6366F1]/60 font-light mb-2">
              Etapa {step + 1} de {steps.length}
            </p>
            <h2 className="text-xl font-light text-white/80 mb-6">{current.title}</h2>

            {current.content}

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="px-5 py-3 border border-white/[0.08] rounded-md text-white/40 text-sm font-light hover:border-white/20 transition-colors">
                  Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!current.valid || isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-light tracking-wide uppercase rounded-md transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : step === steps.length - 1 ? "Enviar Cadastro" : <>Próximo <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── LANDING ───
  return (
    <main className="min-h-screen selection:bg-[#6366F1]/30">
      <SEOHead title="Influenciadoras | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." />

      {/* ─── HERO (LIGHT) ─── */}
      <section data-light className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-gradient-radial from-[#e0e0e0]/30 via-[#f5f5f5]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <img src={synluaLogoDark} alt="" className="w-64 sm:w-80 md:w-96 lg:w-[500px] opacity-[0.04] pointer-events-none select-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeUp}>
              <img src={synluaLogoHorizontal} alt="Synlua" className="h-14 sm:h-16 md:h-20 mx-auto mb-6" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/40 font-light">
              Influenciadoras
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1] text-[#050505]">
              Bem-vinda ao{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Ecossistema Synlua.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light leading-relaxed max-w-xl mx-auto">
              Somos uma das maiores empresas de marketing digital do Brasil. Conectamos influenciadoras às marcas certas, criando parcerias que geram resultado real para os dois lados.
            </motion.p>
            <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-[#333] font-light leading-relaxed max-w-2xl mx-auto">
              Seu cadastro foi recebido com sucesso. Agora, conheça como funciona o nosso processo.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button onClick={() => document.getElementById("quem-somos")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center gap-3 px-8 py-4 border border-[#6366F1] rounded-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                Saiba Mais
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── QUEM SOMOS (DARK) ─── */}
      <section id="quem-somos" className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366F1]/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4">Quem Somos</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-8">A Synlua conecta você às marcas certas</motion.h2>
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                A Synlua é uma agência de marketing full-service que atua como ponte entre influenciadoras e marcas de diversos segmentos. Nosso ecossistema reúne dezenas de empresas parceiras — de moda e beleza a tecnologia e alimentação — todas buscando influenciadoras autênticas para representar seus produtos.
              </p>
              <p className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                Nosso trabalho é fazer o match perfeito: analisamos seu nicho, audiência, estilo de conteúdo e engajamento para identificar quais marcas fazem mais sentido para o seu perfil. Não é sobre volume — é sobre relevância. Queremos que cada parceria seja genuína e traga resultado real.
              </p>
              <p className="text-base sm:text-lg text-white/55 font-light leading-relaxed">
                Com anos de experiência no mercado digital brasileiro, já conectamos centenas de influenciadoras a campanhas que fizeram diferença — tanto em faturamento quanto em posicionamento de marca. E agora, queremos fazer o mesmo por você.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">Processo</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6 text-[#050505]">Como Funciona</motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#666] font-light mb-12 max-w-lg">
              Do cadastro à execução da publi — cada etapa é pensada para garantir uma experiência transparente e profissional.
            </motion.p>

            <div className="relative">
              <div className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1]/30 via-[#6366F1]/10 to-transparent" />
              <div className="space-y-8">
                {timelineSteps.map((s, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-5 sm:gap-6 group">
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] rounded-full border border-[#6366F1]/20 bg-white flex items-center justify-center group-hover:border-[#6366F1]/50 transition-colors duration-500 relative z-10 shadow-sm">
                        <s.icon className="w-5 h-5 text-[#6366F1]" />
                      </div>
                    </div>
                    <div className="pb-2 pt-2">
                      <p className="text-base sm:text-lg text-[#333] font-normal mb-1">{s.title}</p>
                      <p className="text-sm sm:text-base text-[#666] font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ACELERE SEU PROCESSO (DARK) ─── */}
      <section className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366F1]/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/30 font-light mb-4">Plano Prioritário</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6">Acelere Seu Processo</motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/45 font-light mb-12 max-w-lg">
              O processo padrão de análise e match com marcas leva de 4 a 6 semanas. Mas se você quer começar mais rápido, existe um caminho.
            </motion.p>

            <motion.div variants={fadeUp} className="border border-[#6366F1]/30 rounded-lg p-8 sm:p-10 bg-gradient-to-br from-[#6366F1]/[0.06] to-transparent relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Crown className="w-8 h-8 text-[#6366F1]/20" />
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#6366F1]/60 font-medium mb-3">Fila VIP</p>
                  <h3 className="text-2xl sm:text-3xl font-extralight text-white/90 mb-2">Plano Acelerado</h3>
                  <p className="text-base text-white/45 font-light leading-relaxed">
                    Com o plano prioritário, seu perfil entra na fila VIP de análise. Em até <strong className="text-white/70">2 semanas</strong>, você recebe a primeira proposta de publi personalizada — enquanto o processo normal pode levar mais de um mês.
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extralight text-white/90">R$ 997</span>
                  <span className="text-sm text-white/30 font-light">único</span>
                </div>

                <div className="space-y-3">
                  {[
                    "Análise prioritária do perfil",
                    "Match acelerado com marcas do ecossistema",
                    "Primeira proposta de publi em até 2 semanas",
                    "Suporte dedicado durante todo o processo",
                    "Acesso antecipado a novas campanhas",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1] flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-white/55 font-light">{item}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/5500000000000?text=Olá!%20Tenho%20interesse%20no%20Plano%20Acelerado%20para%20influenciadoras."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-light text-sm tracking-wide uppercase rounded-md transition-all duration-500 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  <Rocket className="w-4 h-4" />
                  Quero Acelerar
                </a>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-sm text-white/25 font-light mt-6 text-center">
              O plano acelerado não é obrigatório. Todas as influenciadoras cadastradas passam pelo processo padrão sem custo adicional.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── POR QUE A SYNLUA (LIGHT) ─── */}
      <section data-light className="py-24 sm:py-32 relative bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#050505]/30 font-light mb-4">Diferenciais</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-12 text-[#050505]">Por que a Synlua?</motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyCards.map((card, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 p-5 rounded-lg border border-[#050505]/[0.06] bg-white hover:border-[#6366F1]/30 transition-colors duration-500">
                  <card.icon className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base text-[#333] font-normal mb-1">{card.title}</p>
                    <p className="text-sm text-[#666] font-light leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL (DARK) ─── */}
      <section className="py-24 sm:py-32 relative bg-[#050505] text-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-6">
              Seu cadastro foi{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">recebido.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/45 font-light leading-relaxed max-w-lg mx-auto mb-4">
              Nossa equipe já está analisando seu perfil. Em breve, entraremos em contato com os próximos passos — fique de olho no seu WhatsApp e e-mail.
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-white/25 font-light">
              Enquanto isso, continue criando conteúdo incrível. As melhores oportunidades vão até quem não para.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/15 font-light">Synlua Marketing</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default InfluencerOnboarding;

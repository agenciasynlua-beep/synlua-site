import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, Phone, Instagram, MessageCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <PageLayout showCTA={false}>
      <SEOHead
        title="Contato | Synlua — Braço de Marketing Completo"
        description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
        keywords="contato synlua, agendar reunião, consultoria marketing"
      />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(258,90%,66%,0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <SectionLabel text="CONTATO" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#EDEDED] tracking-tight mt-4 mb-6">
              Vamos{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                conversar
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#808080] leading-relaxed max-w-2xl">
              Preencha o formulário para agendar uma conversa estratégica ou entre em contato direto pelos canais abaixo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left - CTA + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Main CTA Card */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[hsl(258,90%,66%,0.5)] via-[hsl(239,84%,67%,0.3)] to-transparent">
                <div className="rounded-2xl bg-[#0a0a0a] px-6 sm:px-8 py-8 sm:py-10 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[radial-gradient(ellipse,hsl(258,90%,66%,0.12)_0%,transparent_70%)]" />
                  <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-light text-[#EDEDED] mb-3">
                      Fale Com Um Estrategista
                    </h2>
                    <p className="text-sm text-[#999] leading-relaxed mb-6">
                      Responda algumas perguntas rápidas sobre seu negócio e receba um plano de ação personalizado.
                    </p>
                    <Link
                      to="/#diagnostico"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-medium text-sm tracking-wide uppercase rounded-lg transition-all duration-300 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:scale-105 shadow-[0_0_30px_hsl(258,90%,66%,0.3)] hover:shadow-[0_0_50px_hsl(258,90%,66%,0.5)] group"
                    >
                      Quero Escalar Meus Resultados
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <div className="mt-6 flex items-center gap-4 text-xs text-[#666]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Menos de 2 min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Sem compromisso
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "+55 (11) 94559-2596", href: "tel:+5511945592596" },
                  { icon: Mail, label: "contato@synlua.com", href: "mailto:contato@synlua.com" },
                  { icon: MapPin, label: "São Paulo, Brasil", href: undefined },
                ].map((item) => {
                  const Icon = item.icon;
                  const Tag = item.href ? "a" : "div";
                  return (
                    <Tag
                      key={item.label}
                      {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 p-4 border border-[#1a1a1a] rounded-xl bg-[#0a0a0a]/50 hover:border-[#6366F1]/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <span className="text-sm text-[#EDEDED] font-light">{item.label}</span>
                    </Tag>
                  );
                })}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/synlua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 border border-[#1a1a1a] rounded-xl bg-[#0a0a0a]/50 hover:border-[#6366F1]/20 transition-all duration-300 text-sm text-[#808080] hover:text-[#EDEDED]"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a
                  href="https://wa.me/5511945592596?text=Olá!%20Quero%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 border border-[#1a1a1a] rounded-xl bg-[#0a0a0a]/50 hover:border-[#6366F1]/20 transition-all duration-300 text-sm text-[#808080] hover:text-[#EDEDED]"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right - Map / Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="border border-[#1a1a1a] rounded-xl overflow-hidden bg-[#0a0a0a] flex-1 min-h-[300px] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(258,90%,66%,0.04)_0%,transparent_70%)]" />
                <div className="text-center relative z-10 p-8">
                  <div className="w-16 h-16 rounded-full bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-7 h-7 text-[#6366F1]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-[#EDEDED] mb-2">São Paulo, SP</h3>
                  <p className="text-sm text-[#666]">Brasil</p>
                  <div className="mt-6 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent mx-auto" />
                  <p className="mt-6 text-sm text-[#999] max-w-xs mx-auto leading-relaxed">
                    Atendemos empresas de todo o Brasil com equipe remota e presencial em São Paulo.
                  </p>
                </div>
              </div>

              <div className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0a0a0a]/50">
                <h3 className="text-sm font-light text-[#EDEDED] mb-2 tracking-wide">HORÁRIO DE ATENDIMENTO</h3>
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-3" />
                <p className="text-sm text-[#999]">Segunda a Sexta: 9h às 18h</p>
                <p className="text-xs text-[#666] mt-1">Respondemos em até 24 horas úteis</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;

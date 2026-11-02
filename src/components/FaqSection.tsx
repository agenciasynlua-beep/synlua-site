import { openQuiz } from "@/lib/quiz";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlowButton from "@/components/ui/glow-button";
import SectionLabel from "@/components/SectionLabel";

const faqs = [
  {
    q: "Quanto custa trabalhar com a Synlua?",
    a: "Depende do escopo: social media, tráfego, audiovisual ou o pacote completo. Na conversa inicial você recebe uma proposta com valores claros, sem taxas escondidas.",
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: "Leads e alcance aparecem nas primeiras semanas de mídia ativa. Posicionamento e vendas consistentes se constroem em cerca de 90 dias.",
  },
  {
    q: "Existe fidelidade ou multa de cancelamento?",
    a: "Não. Nossos contratos não têm multa de cancelamento: você fica pelo resultado, não por obrigação.",
  },
  {
    q: "Como funciona o começo do trabalho?",
    a: "Conversa estratégica, diagnóstico do negócio, metas e plano de ação. Depois entram conteúdo, captações e campanhas.",
  },
  {
    q: "Vocês atendem empresas de fora de Barueri?",
    a: "Sim. Nosso time fica em Barueri/SP e atende todo o Brasil de forma remota, com captações presenciais quando o projeto pede.",
  },
  {
    q: "Preciso já ter redes sociais estruturadas?",
    a: "Não. Atendemos quem começa do zero e quem já tem presença digital e precisa de estratégia e constância.",
  },
];

const scrollToForm = () =>
  openQuiz();

const FaqSection = () => {
  return (
    <section id="faq" className="relative bg-[#050508] py-16 sm:py-24" style={{ scrollMarginTop: "90px" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(189,134,245,0.08)_0%,transparent_60%)]"
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <SectionLabel text="DÚVIDAS_FREQUENTES" />
          </div>
          <h2 className="mt-5 text-[clamp(1.75rem,7vw,2.4rem)] sm:text-4xl md:text-5xl font-extralight text-[#EDEDED] tracking-tight leading-[1.15]">
            Antes de falar com a gente,{" "}
            <span className="bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5] bg-clip-text text-transparent">
              tire suas dúvidas
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="border border-white/[0.06] bg-[#0a0a14]/70 rounded-2xl px-5 sm:px-6 data-[state=open]:border-[#bd86f5]/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-[15px] sm:text-base font-light text-[#EDEDED] hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-[15px] text-[#8a8a95] font-light leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <GlowButton type="button" variant="gradient" onClick={scrollToForm}>
            Fale Conosco
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/glow:translate-x-1" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

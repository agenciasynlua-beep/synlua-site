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
    a: "O investimento varia conforme o escopo: social media, tráfego pago, audiovisual ou o pacote completo. Na conversa inicial entendemos seu cenário e apresentamos uma proposta com valores claros, sem taxas escondidas.",
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: "Os primeiros sinais (leads, alcance e volume de conteúdo) costumam aparecer nas primeiras semanas de mídia ativa. Resultados consistentes de posicionamento e vendas são construídos ao longo dos primeiros 90 dias.",
  },
  {
    q: "Existe fidelidade ou multa de cancelamento?",
    a: "Trabalhamos com contratos sem multa de cancelamento. A parceria se mantém pelo resultado entregue, não por amarras contratuais.",
  },
  {
    q: "Como funciona o começo do trabalho?",
    a: "Depois da conversa estratégica, fazemos o diagnóstico do seu negócio, alinhamos metas e montamos o plano de ação. Em seguida entram a produção de conteúdo, as captações e a estruturação das campanhas.",
  },
  {
    q: "Vocês atendem empresas de fora de Barueri?",
    a: "Sim. Nosso time fica em Barueri/SP, com estrutura própria de captação, e atendemos clientes de todo o Brasil de forma remota, com agendas presenciais quando o projeto pede.",
  },
  {
    q: "Preciso já ter redes sociais estruturadas?",
    a: "Não. Atendemos tanto quem está começando do zero quanto quem já tem presença digital e precisa de estratégia, constância e performance.",
  },
];

const scrollToForm = () =>
  openQuiz();

const FaqSection = () => {
  return (
    <section id="faq" className="relative bg-[#050508] py-16 sm:py-24" style={{ scrollMarginTop: "90px" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)]"
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
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
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
                className="border border-white/[0.06] bg-[#0a0a14]/70 rounded-2xl px-5 sm:px-6 data-[state=open]:border-[#8B5CF6]/30 transition-colors"
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

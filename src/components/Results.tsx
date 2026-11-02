import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { openQuiz } from "@/lib/quiz";

const shots = import.meta.glob("@/assets/results/*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const shot = (name: string) => shots[Object.keys(shots).find((k) => k.endsWith(`/${name}.webp`)) ?? ""];

type Result = { img: string; w: number; h: number; big: string; unit: string; text: string; feature?: boolean };

// Prints reais de clientes; nomes, fotos e marcas ficam pixelados nas imagens.
const results: Result[] = [
  { img: "meta-300k", w: 760, h: 567, big: "R$ 300 mil", unit: "meta batida em 13 dias", text: "Em um lançamento, o cliente passou de R$ 300 mil em vendas em apenas 13 dias.", feature: true },
  { img: "faturamento-semana", w: 760, h: 437, big: "R$ 149 mil", unit: "em uma semana", text: "Só com captação orgânica e social selling. Agora o cliente quer somar mídia paga." },
  { img: "cem-mil", w: 760, h: 708, big: "R$ 100 mil", unit: "de faturamento no mês", text: "R$ 50 mil vieram em uma única semana." },
  { img: "quinze-mil", w: 760, h: 495, big: "+R$ 15 mil", unit: "em um dia de campanha", text: "Média de R$ 9.340 por dia desde o início da semana do consumidor." },
  { img: "agendados", w: 760, h: 802, big: "23 consultas", unit: "agendadas, R$ 4.025", text: "Primeira campanha de público quente, com R$ 529 investidos." },
  { img: "recorde", w: 760, h: 601, big: "Recorde", unit: "de vendas em 3 anos", text: "Em um ano os leads superaram tudo o que a empresa tinha visto antes." },
  { img: "contratos", w: 760, h: 582, big: "2 contratos", unit: "fechados em um dia", text: "R$ 7,5 mil em recorrência, com acompanhamento direto no sistema." },
  { img: "vendas", w: 760, h: 1007, big: "Vendas", unit: "entrando todo dia", text: "Notificações de venda realizada, de R$ 497 a R$ 1.166 cada." },
  { img: "views", w: 760, h: 255, big: "50 mil", unit: "visualizações por mês", text: "Alcance que o cliente nunca tinha conseguido sozinho." },
  { img: "depoimento", w: 760, h: 687, big: "“Escolhi vocês”", unit: "pelo encontro que imaginei", text: "O elogio mais comum: entrega, cuidado e um olhar singular para a marca." },
];

const Card = ({ r, i }: { r: Result; i: number }) => (
  <motion.figure
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
    className="mb-4 sm:mb-5 break-inside-avoid"
  >
    <div className={`relative overflow-hidden rounded-[26px] border p-5 sm:p-6 ${r.feature ? "border-[#bd86f5]/40 bg-gradient-to-br from-[#2a1d5a] via-[#1a1238] to-[#0a0a14] shadow-[0_0_50px_-10px_rgba(189,134,245,0.35)]" : "border-white/[0.06] bg-[#0a0a12]"}`}>
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#7c5ad6]/20 blur-3xl" />
      <div className="relative">
        <p className="sl-display sl-grad text-[clamp(2rem,9vw,2.6rem)] sm:text-[2.6rem] leading-none">{r.big}</p>
        <p className="mt-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] text-[#c7b2f7]">{r.unit}</p>
        <p className="mt-3 text-sm font-light leading-relaxed text-[#EDEDED]/75">{r.text}</p>
      </div>
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-black">
        <img src={shot(r.img)} alt={`Print real de conversa de cliente: ${r.big} ${r.unit}`} width={r.w} height={r.h} loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
      <figcaption className="relative mt-3 flex items-center gap-2 text-[11px] font-light text-[#808080]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#bd86f5]" />
        Print real · nome do cliente preservado
      </figcaption>
    </div>
  </motion.figure>
);

const Results = () => {
  const [all, setAll] = useState(false);
  return (
    <section id="resultados" className="relative bg-[#050508] py-20 sm:py-32" style={{ scrollMarginTop: "90px" }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,90,214,0.10)_0%,transparent_60%)]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <SectionLabel text="RESULTADOS" />
          <h2 className="text-[clamp(1.9rem,8vw,2.6rem)] text-[#EDEDED] sm:text-5xl md:text-6xl">
            O que nossos clientes <span className="sl-grad">contam no WhatsApp</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-[#808080] sm:text-base">
            Mensagens reais, sem edição. Só pixelamos nomes e fotos para proteger quem confiou na gente.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl columns-1 gap-4 sm:gap-5 md:columns-2 lg:columns-3">
          {results.map((r, i) => (
            <div key={r.img} className={!all && i >= 6 ? "md:block hidden" : ""}>
              <Card r={r} i={i} />
            </div>
          ))}
        </div>

        {!all && (
          <div className="mt-2 flex justify-center md:hidden">
            <button type="button" onClick={() => setAll(true)} className="rounded-full border border-white/10 px-6 py-3 text-sm font-light text-[#EDEDED] active:scale-95">
              Ver mais resultados
            </button>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={openQuiz}
            className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#5f3fb5] via-[#bd86f5] to-[#7c5ad6] px-9 py-4 text-[15px] font-medium tracking-wide text-white shadow-[0_0_44px_-4px_rgba(189,134,245,0.6)] transition-all duration-300 active:scale-95 sm:px-12"
          >
            <span className="relative">Quero um resultado assim</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Results;

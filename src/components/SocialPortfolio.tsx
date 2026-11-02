import { openQuiz } from "@/lib/quiz";
import SectionLabel from "@/components/SectionLabel";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { Hand, X, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import giseleGomes from "@/assets/portfolio/new/p5.webp";
import parnassahNew from "@/assets/portfolio/new/p3.webp";
import jenifferDuval from "@/assets/portfolio/new/p11.webp";
import graziellaAguiar from "@/assets/portfolio/new/p12.webp";
import caofiel from "@/assets/portfolio/new/p9.webp";
import wiser from "@/assets/portfolio/wiser.webp";
import maxime from "@/assets/portfolio/maxime.webp";
import brunoFerreira from "@/assets/portfolio/bruno-ferreira.webp";
import openbot from "@/assets/portfolio/openbot.webp";

import wiseUp from "@/assets/portfolio/new/Wise_Up.webp";
import professorAugusto from "@/assets/portfolio/new/Professor_Augusto.webp";
import inattoArquitetura from "@/assets/portfolio/new/Inatto_Arquitetura.webp";
import maximeNew from "@/assets/portfolio/new/Maxime.webp";
import daRochaOliveira from "@/assets/portfolio/new/Da_Rocha_e_Oliveira_ADV.webp";
import wiserEmpreende from "@/assets/portfolio/new/Wiser_Empreende.webp";

type Client = { name: string; image: string; tags: string[] };

const allClients: Client[] = [
  { name: "Dra. Gisele Gomes", image: giseleGomes, tags: ["Conteúdo", "Design"] },
  { name: "Parnassah", image: parnassahNew, tags: ["Conteúdo", "Estratégia"] },
  { name: "Wise Up", image: wiseUp, tags: ["Conteúdo", "Branding"] },
  { name: "Professor Augusto", image: professorAugusto, tags: ["Conteúdo", "Estratégia"] },
  { name: "Inatto Arquitetura", image: inattoArquitetura, tags: ["Conteúdo", "Design"] },
  { name: "Maxime", image: maximeNew, tags: ["Conteúdo", "Branding"] },
  { name: "Da Rocha e Oliveira ADV", image: daRochaOliveira, tags: ["Conteúdo", "Design"] },
  { name: "Wiser Empreende", image: wiserEmpreende, tags: ["Conteúdo", "Estratégia"] },
  { name: "Jeniffer Duval", image: jenifferDuval, tags: ["Conteúdo", "Estratégia"] },
  { name: "Graziella Aguiar", image: graziellaAguiar, tags: ["Conteúdo", "Design"] },
  { name: "Petshop Cãofiel", image: caofiel, tags: ["Conteúdo", "Branding"] },
  { name: "Wiser", image: wiser, tags: ["Conteúdo", "Design"] },
  { name: "Maxime (Industrial)", image: maxime, tags: ["Conteúdo", "Design"] },
  { name: "Bruno Ferreira", image: brunoFerreira, tags: ["Conteúdo", "Branding"] },
  { name: "Openbot", image: openbot, tags: ["Conteúdo", "Estratégia"] },
];

const half = Math.ceil(allClients.length / 2);
const rowTop = allClients.slice(0, half);
const rowBottom = allClients.slice(half);

const DragHint = ({ light = false }: { light?: boolean }) => (
  <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-[11px] font-light tracking-wide opacity-70 animate-fade-in">
    <Hand className={`w-3.5 h-3.5 ${light ? "text-[#7c5ad6]" : "text-[#bd86f5]"}`} />
    <span className={light ? "text-[#555]" : "text-[#808080]"}>Arraste para explorar</span>
  </div>
);

/** Cartão de cliente: clique abre o case ampliado (ignora arrastes). */
const ClientCard = ({ client, light, onOpen, className = "" }: { client: Client; light: boolean; onOpen: (c: Client) => void; className?: string }) => {
  const down = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Abrir case ${client.name}`}
      onPointerDown={(e) => { down.current = { x: e.clientX, y: e.clientY }; }}
      onClick={(e) => { const d = down.current; if (!d || (Math.abs(e.clientX - d.x) < 8 && Math.abs(e.clientY - d.y) < 8)) onOpen(client); }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(client); } }}
      className={`group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#bd86f5]/60 rounded-xl ${className}`}
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#1f1f35]/40 bg-[#0a0a14] shadow-[0_8px_32px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#7c5ad6]/50 hover:shadow-[0_12px_40px_-18px_rgba(124,90,214,0.25)] hover:scale-[1.02] hover:-translate-y-1">
        <img
          src={client.image}
          alt={`Portfolio ${client.name}`}
          draggable={false}
          width={1080}
          height={1350}
          className="block w-full h-full object-cover pointer-events-none transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
          <span className="text-[#EDEDED] text-lg font-light">{client.name}</span>
          <span className="sl-label text-[11px] flex items-center gap-1">Ver case <ArrowRight className="w-3 h-3" /></span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
        <p className="text-current text-sm sm:text-base font-light tracking-wide truncate pr-2">{client.name}</p>
        <span className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] sm:text-xs rounded-full px-3 py-1 border ${light ? "text-[#1a1a2e]/80 bg-[#f5f5f7] border-[#e0e0e8]" : "text-[#EDEDED]/80 bg-[#0a0a14] border-[#1a1a2e]"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#bd86f5]" />
          {client.tags[0]}
        </span>
      </div>
    </div>
  );
};

const MarqueeRow = ({ items, reverse = false, duration = "70s", light = false, onOpen }: { items: Client[]; reverse?: boolean; duration?: string; light?: boolean; onOpen: (c: Client) => void }) => {
  const { containerRef, handlers } = useDragScroll();
  return (
    <div
      ref={containerRef}
      {...handlers}
      className="overflow-x-auto overflow-y-visible scrollbar-hide select-none [touch-action:pan-x_pan-y]"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className={`flex w-max ${reverse ? "animate-scroll-right" : "animate-scroll-left"} will-change-transform transform-gpu`}
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-5 sm:gap-6 pr-5 sm:pr-6" aria-hidden={setIndex === 1}>
            {items.map((client) => (
              <ClientCard key={`${client.name}-${setIndex}`} client={client} light={light} onOpen={onOpen} className="flex-shrink-0 w-[240px] sm:w-[300px] md:w-[340px]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialPortfolio = ({ subtitle, light = false }: { subtitle?: string; light?: boolean }) => {
    const [open, setOpen] = useState<Client | null>(null);
  return (
    <section
      id="portfolio"
      data-light={light || undefined}
      className={`relative py-16 sm:py-28 overflow-hidden ${light ? "bg-[#FAFAFA] text-[#1a1a2e]" : "bg-[#050508] text-[#EDEDED]"}`}
      style={{ scrollMarginTop: "90px" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c5ad6]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c5ad6]/10 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center">
            <SectionLabel text="PORTFOLIO" />
          </div>
          <h2 className={`text-[clamp(2rem,8vw,2.8rem)] sm:text-5xl md:text-6xl ${light ? "text-[#1a1a2e]" : "text-[#EDEDED]"}`}>
            Estética que{" "}
            <span className="sl-grad">converte</span>
          </h2>
          <p className={`mt-4 text-sm sm:text-base max-w-xl mx-auto whitespace-pre-line ${light ? "text-[#555]" : "text-[#808080]"}`}>
            {subtitle ?? "Criamos conteúdo estratégico que transforma \nfeeds em máquinas de conversão."}
          </p>

          <DragHint light={light} />
        </div>
      </div>

      <div className="relative space-y-6">
        <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r to-transparent z-10 pointer-events-none ${light ? "from-[#FAFAFA]" : "from-[#050508]"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l to-transparent z-10 pointer-events-none ${light ? "from-[#FAFAFA]" : "from-[#050508]"}`} />
        <MarqueeRow items={rowTop} duration="80s" light={light} onOpen={setOpen} />
        <MarqueeRow items={rowBottom} reverse duration="90s" light={light} onOpen={setOpen} />
      </div>

      <div className="mt-10 sm:mt-14 flex justify-center">
        <button
          type="button"
          onClick={() => openQuiz()}
          className={`inline-flex items-center gap-2 text-sm rounded-full px-5 py-2.5 transition-all duration-300 ${
            light
              ? "text-[#1a1a2e] border border-[#e0e0e8] bg-white hover:border-[#7c5ad6]/50"
              : "text-[#EDEDED]/80 hover:text-[#EDEDED] border border-[#1a1a2e] hover:border-[#7c5ad6]/50 bg-[#0a0a14]/50 hover:bg-[#0a0a14]"
          }`}
        >
          Fale Conosco
          <span aria-hidden>→</span>
        </button>
      </div>

      {/* case ampliado */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(94vw,980px)] w-full p-0 border border-white/10 bg-[#07070d] text-[#EDEDED] overflow-hidden sm:rounded-3xl max-h-[92svh]">
          {open && (
            <div className="grid md:grid-cols-[1.1fr_1fr] max-h-[92svh] overflow-y-auto">
              <div className="bg-[#0a0a14]">
                <img src={open.image} alt={`Case ${open.name}`} className="block w-full h-full object-cover md:max-h-[92svh]" />
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center gap-5">
                <span className="sl-label text-xs">[Case]</span>
                <DialogTitle className="sl-display text-3xl sm:text-4xl !tracking-[-0.05em] text-left">{open.name}</DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-[#808080] font-light leading-relaxed text-left">
                  Estratégia, conteúdo e design pensados para o posicionamento deste negócio, com a rotina de produção e publicação a cargo da Synlua.
                </DialogDescription>
                <div className="flex flex-wrap gap-2">
                  {open.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-xs rounded-full px-3 py-1 border border-[#1a1a2e] bg-[#0a0a14] text-[#EDEDED]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#bd86f5]" />{t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setOpen(null); openQuiz(); }}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5] shadow-[0_0_44px_-6px_rgba(189,134,245,0.6)] active:scale-95 transition-transform"
                >
                  Quero um resultado assim <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SocialPortfolio;

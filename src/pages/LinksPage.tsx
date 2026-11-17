import { useEffect } from "react";
import { ArrowUpRight, Lock } from "lucide-react";

const IMGS = ["wiseup", "parnassah", "maxime", "augusto", "inatto", "gisele", "wiserempreende", "darocha", "jeniffer", "graziella", "wiser", "maxime2"];
const utm = "utm_source=instagram&utm_medium=bio&utm_campaign=links";
const links = [
  { label: "Fale Conosco", hint: "Mostramos com dados e estratégia o que podemos fazer pela sua empresa.", href: `https://forms.synlua.com.br/?${utm}`, primary: true },
  { label: "Conheça a Synlua", hint: "synlua.com.br", href: `/?${utm}`, primary: false },
];

const css = `
.lk-display{font-family:Delight,Inter,sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:-0.055em;line-height:1.02}
.lk-label{font-family:Delight,Inter,sans-serif;text-transform:uppercase;letter-spacing:.03em;color:#c7b2f7}
.lk-ring{position:relative;display:block;padding:1px;border-radius:24px;overflow:hidden;isolation:isolate;transition:transform .35s cubic-bezier(.22,1,.36,1)}
.lk-ring:active{transform:scale(.985)}
.lk-ring.is-main{background:linear-gradient(140deg,rgba(199,178,247,.55),rgba(124,90,214,.25) 45%,rgba(189,134,245,.5));box-shadow:0 24px 60px -28px rgba(189,134,245,.75)}
.lk-ring.is-main::before{content:"";position:absolute;inset:-80%;z-index:-1;background:conic-gradient(from 0deg,transparent 0 62%,rgba(224,200,255,.95) 72%,transparent 82%);animation:lkSpin 6s linear infinite}
.lk-ring.is-alt{background:linear-gradient(140deg,rgba(199,178,247,.28),rgba(255,255,255,.04) 50%,rgba(199,178,247,.16))}
.lk-in{position:relative;display:flex;align-items:center;gap:16px;border-radius:23px;padding:22px 20px 22px 24px;overflow:hidden}
.is-main .lk-in{background:radial-gradient(120% 140% at 100% 0%,rgba(124,90,214,.55) 0%,rgba(124,90,214,0) 55%),linear-gradient(160deg,#1d1535 0%,#0e0a1c 100%)}
.is-alt .lk-in{background:linear-gradient(160deg,rgba(18,16,32,.92),rgba(10,9,20,.92));backdrop-filter:blur(8px)}
.is-main .lk-in::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.10),transparent);transform:skewX(-18deg);animation:lkShine 5.5s ease-in-out 1.2s infinite}
.lk-title{font-family:Delight,Inter,sans-serif;text-transform:uppercase;letter-spacing:-0.035em;line-height:1}
.lk-dot{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:999px;transition:transform .35s cubic-bezier(.22,1,.36,1)}
.is-main .lk-dot{background:linear-gradient(140deg,#bd86f5,#7c5ad6);box-shadow:0 0 28px -4px rgba(189,134,245,.8),inset 0 0 0 1px rgba(255,255,255,.25)}
.is-alt .lk-dot{border:1px solid rgba(199,178,247,.3);color:#c7b2f7}
.lk-ring:hover .lk-dot{transform:translate(2px,-2px)}
.lk-ring.is-off{background:linear-gradient(140deg,rgba(224,200,255,.22),rgba(255,255,255,.03) 50%,rgba(224,200,255,.12));cursor:default}
.lk-ring.is-off:active{transform:none}
.is-off .lk-in{background:repeating-linear-gradient(135deg,rgba(255,255,255,.018) 0 1px,transparent 1px 9px),linear-gradient(160deg,rgba(16,14,28,.94),rgba(9,8,18,.94))}
.is-off .lk-dot{border:1px dashed rgba(199,178,247,.28);color:rgba(199,178,247,.6)}
@keyframes lkSpin{to{transform:rotate(360deg)}}
@keyframes lkShine{0%,60%{left:-60%}100%{left:130%}}
@keyframes lkLeft{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
@keyframes lkRight{from{transform:translateX(-33.333%)}to{transform:translateX(0)}}
.lk-left{animation:lkLeft 45s linear infinite}.lk-right{animation:lkRight 52s linear infinite}
@media (prefers-reduced-motion:reduce){.lk-left,.lk-right,.lk-ring::before,.lk-in::after{animation:none}}
`;

const fadeV = "linear-gradient(180deg, transparent 0%, #000 20%, #000 62%, transparent 100%)";
const fadeH = "linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%)";
const mask = { maskImage: `${fadeV}, ${fadeH}`, WebkitMaskImage: `${fadeV}, ${fadeH}`, maskComposite: "intersect", WebkitMaskComposite: "source-in" } as React.CSSProperties;

/** Página de links da bio: vitrine do portfólio, proposta de valor e dois caminhos. */
const LinksPage = () => {
  useEffect(() => { document.title = "Synlua · Links"; }, []);
  const rows = [IMGS.slice(0, 6), IMGS.slice(6)];
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#07070d] text-[#EDEDED]">
      <style>{css}</style>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#7c5ad6]/20 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#bd86f5]/10 blur-[120px]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-md flex-col">
        <header className="flex justify-center pt-9 pb-1"><img src="/links/logo.webp" alt="Synlua" width={147} height={72} className="h-[52px] w-auto" /></header>
        <div aria-hidden className="relative overflow-hidden" style={{ height: 190, ...mask }}>
          <div className="absolute inset-x-[-20%] top-1 flex flex-col gap-3 -rotate-[5deg]">
            {rows.map((row, r) => (
              <div key={r} className={`flex w-max gap-3 ${r ? "lk-right" : "lk-left"}`}>
                {[...row, ...row, ...row].map((n, i) => (
                  <img key={`${n}-${i}`} src={`/links/${n}.webp`} alt="" width={78} height={96} decoding="async" draggable={false}
                    className="h-[96px] w-[78px] shrink-0 rounded-xl border border-white/[0.06] object-cover bg-[#0b0b16] opacity-60" />
                ))}
              </div>
            ))}
          </div>
        </div>
        <section className="-mt-12 relative px-6">
          <div className="lk-label text-[11px] mb-3">[Synlua Marketing]</div>
          <h1 className="lk-display text-[1.9rem]">O braço de marketing completo da sua empresa</h1>
        </section>
        <nav className="mt-10 flex flex-col gap-4 px-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`lk-ring group ${l.primary ? "is-main" : "is-alt"}`}>
              <span className="lk-in">
                <span className="min-w-0 flex-1">
                  <span className={`lk-title block ${l.primary ? "text-[1.45rem] text-white" : "text-[1.15rem] text-[#EDEDED]"}`}>{l.label}</span>
                  <span className={`mt-2 block font-light leading-snug ${l.primary ? "text-[13.5px] text-white/70" : "text-[13px] text-[#EDEDED]/50"}`}>{l.hint}</span>
                </span>
                <span className="lk-dot"><ArrowUpRight className="h-5 w-5" strokeWidth={1.6} /></span>
              </span>
            </a>
          ))}
          <div className="lk-ring is-off" aria-disabled="true">
            <span className="lk-in">
              <span className="min-w-0 flex-1">
                <span className="lk-title block text-[1.15rem] text-[#EDEDED]/85">Acompanhamento individual</span>
                <span className="mt-2 block text-[13px] font-light text-[#EDEDED]/50">A partir de <span className="text-[#e0c8ff]/90">R$ 20 mil</span></span>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#c7b2f7]/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c7b2f7]/60" />Sem vagas no momento
                </span>
              </span>
              <span className="lk-dot"><Lock className="h-[18px] w-[18px]" strokeWidth={1.5} /></span>
            </span>
          </div>
        </nav>
        <footer className="mt-auto pt-12 pb-8 text-center text-xs font-light text-[#6d6d88]">Marketing + tecnologia · Barueri/SP</footer>
      </div>
    </main>
  );
};

export default LinksPage;

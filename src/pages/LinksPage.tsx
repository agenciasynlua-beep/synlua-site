import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const IMGS = ["wiseup", "parnassah", "maxime", "augusto", "inatto", "gisele", "wiserempreende", "darocha", "jeniffer", "graziella", "wiser", "maxime2"];
const utm = "utm_source=instagram&utm_medium=bio&utm_campaign=links";
const links = [
  { label: "Quero falar com a Synlua", hint: "Formulário de 1 minuto", href: `https://forms.synlua.com.br/?${utm}`, primary: true },
  { label: "Conheça a Synlua", hint: "synlua.com.br", href: `/?${utm}`, primary: false },
];

const css = `
.lk-display{font-family:Delight,Inter,sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:-0.055em;line-height:1.02}
.lk-label{font-family:Delight,Inter,sans-serif;text-transform:uppercase;letter-spacing:.03em;color:#c7b2f7}
.lk-btn{background:linear-gradient(95deg,#7c5ad6,#bd86f5);color:#fff;box-shadow:0 0 44px -8px rgba(189,134,245,.65),inset 0 0 0 1px rgba(255,255,255,.18)}
@keyframes lkLeft{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
@keyframes lkRight{from{transform:translateX(-33.333%)}to{transform:translateX(0)}}
.lk-left{animation:lkLeft 45s linear infinite}.lk-right{animation:lkRight 52s linear infinite}
@media (prefers-reduced-motion:reduce){.lk-left,.lk-right{animation:none}}
`;

const fade = "linear-gradient(180deg, transparent 0%, #000 20%, #000 62%, transparent 100%)";

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
        <header className="flex justify-center pt-8"><img src="/links/symbol.png" alt="Synlua" width={44} height={44} className="h-11 w-auto" /></header>
        <div aria-hidden className="relative overflow-hidden" style={{ height: 190, maskImage: fade, WebkitMaskImage: fade }}>
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
        <nav className="mt-10 flex flex-col gap-3 px-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group flex items-center justify-between rounded-2xl px-6 py-5 transition-transform duration-300 active:scale-[0.98] ${
                l.primary ? "lk-btn" : "border border-[#c7b2f7]/20 bg-white/[0.03] backdrop-blur-sm hover:border-[#c7b2f7]/40"
              }`}
            >
              <span>
                <span className="block text-[17px] font-medium">{l.label}</span>
                <span className={`mt-0.5 block text-[13px] font-light ${l.primary ? "text-white/80" : "text-[#EDEDED]/55"}`}>{l.hint}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </nav>
        <footer className="mt-auto pt-12 pb-8 text-center text-xs font-light text-[#6d6d88]">Marketing + tecnologia · Barueri/SP</footer>
      </div>
    </main>
  );
};

export default LinksPage;

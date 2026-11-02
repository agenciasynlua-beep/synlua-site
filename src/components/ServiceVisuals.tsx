/** Ilustrações animadas (SVG/CSS) de cada serviço — nada fica parado. */
const box = "sv-anim relative h-36 sm:h-44 w-full overflow-hidden rounded-2xl bg-[#0a0a14]/70 border border-white/[0.06]";

export const StrategyVisual = () => (
  <div className={box} aria-hidden>
    {[0, 1, 2].map((i) => (
      <span key={i} className="absolute left-1/2 top-1/2 h-40 w-40 -ml-20 -mt-20 rounded-full border border-[#bd86f5]/50" style={{ animation: `sv-ring 3.2s ease-out ${i * 1.05}s infinite` }} />
    ))}
    <span className="absolute left-1/2 top-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-white shadow-[0_0_24px_6px_rgba(189,134,245,.8)]" />
    <span className="absolute left-[24%] top-[30%] h-2 w-2 rounded-full bg-[#bd86f5]" style={{ animation: "sv-pulse 2.4s ease-in-out infinite" }} />
    <span className="absolute right-[22%] bottom-[26%] h-2 w-2 rounded-full bg-[#7c5ad6]" style={{ animation: "sv-pulse 2.4s ease-in-out .8s infinite" }} />
  </div>
);

export const TrafficVisual = () => (
  <div className={`${box} flex items-end gap-2 px-5 pb-4`} aria-hidden>
    {[0.5, 0.75, 0.6, 0.95, 0.7, 1, 0.8].map((h, i) => (
      <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#48308f] to-[#bd86f5] origin-bottom" style={{ height: `${h * 78}%`, animation: `sv-bar 2.6s ease-in-out ${i * 0.18}s infinite` }} />
    ))}
    <svg className="absolute right-6 top-6 h-7 w-7" viewBox="0 0 24 24" style={{ animation: "sv-click 3s ease-in-out infinite" }}>
      <path d="M5 3l14 8-6 2 4 6-3 2-4-6-4 4z" fill="#fff" stroke="#050508" strokeWidth="1" />
    </svg>
  </div>
);

export const VideoVisual = () => (
  <div className={`${box} px-5 py-5`} aria-hidden>
    {[0, 1, 2].map((r) => (
      <div key={r} className="relative mb-2.5 h-5">
        {[[4, 38], [46, 22], [72, 24]].map(([l, w], k) => (
          <span key={k} className="absolute top-0 h-5 rounded-md" style={{ left: `${(l + r * 6) % 70}%`, width: `${w}%`, background: r === 2 ? "linear-gradient(90deg,#48308f,#7c5ad6)" : "linear-gradient(90deg,#7c5ad6,#bd86f5)", opacity: 0.55 + k * 0.15 }} />
        ))}
      </div>
    ))}
    <span className="absolute top-3 bottom-3 w-[2px] bg-white shadow-[0_0_14px_#bd86f5]" style={{ animation: "sv-play 4s linear infinite" }} />
  </div>
);

const Glyph = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c5ad6] to-[#bd86f5] shadow-[0_0_28px_rgba(124,90,214,.55)]">
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  </span>
);
export const SocialVisual = () => (
  <div className={`${box} flex items-center justify-center gap-5`} aria-hidden>
    {[
      <><rect x="7" y="7" width="34" height="34" rx="11" /><circle cx="24" cy="24" r="8" /></>,
      <path d="M15 20v15M15 13.500v.5M22 35V20M22 27c0-4 3-7 6.500-7s5.500 2.500 5.500 7v8" />,
      <path d="M27 9v22a8 8 0 1 1-8-8M27 9c.8 5 4.400 8.400 10 9" />,
    ].map((g, i) => (
      <div key={i} className="relative" style={{ animation: `sv-float 3.2s ease-in-out ${i * 0.5}s infinite` }}>
        <Glyph>{g}</Glyph>
        <svg viewBox="0 0 24 24" className="absolute -top-1 left-4 h-5 w-5" style={{ animation: `sv-heart 2.6s ease-out ${i * 0.9}s infinite` }}>
          <path d="M12 21s-8-5.200-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.800-8 11-8 11z" fill="#ff5d8f" />
        </svg>
      </div>
    ))}
  </div>
);

export const DataVisual = () => (
  <div className={`${box} px-5 py-4`} aria-hidden>
    <svg viewBox="0 0 300 110" className="h-full w-full" fill="none">
      <defs><linearGradient id="svg-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bd86f5" stopOpacity=".35" /><stop offset="1" stopColor="#7c5ad6" stopOpacity="0" /></linearGradient></defs>
      <path d="M0 90 C40 85 60 60 100 62 S160 78 200 40 S260 20 300 10 L300 110 L0 110Z" fill="url(#svg-area)" style={{ animation: "sv-pulse 4s ease-in-out infinite" }} />
      <path d="M0 90 C40 85 60 60 100 62 S160 78 200 40 S260 20 300 10" stroke="#bd86f5" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray={100} style={{ animation: "sv-draw 4s ease-in-out infinite", filter: "drop-shadow(0 0 8px rgba(189,134,245,.9))" }} />
    </svg>
  </div>
);

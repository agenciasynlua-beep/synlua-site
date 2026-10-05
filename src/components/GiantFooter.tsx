import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import synluaLogo from "@/assets/synlua-logo-white.webp";

const footerColumns = [
  {
    title: "Navegação",
    links: [
      { to: "/#home", label: "Home" },
      { to: "/#servicos", label: "Serviços" },
      { to: "/#portfolio", label: "Portfólio" },
      { to: "/#sobre", label: "Sobre" },
    ],
  },
  {
    title: "Contato",
    links: [
      { to: "/#diagnostico", label: "Fale Conosco" },
    ],
  },
];

const GiantFooter = () => {
  return (
    <footer className="relative py-12 sm:py-16 md:py-20 bg-[#050508] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Top: Logo + Columns */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12 sm:mb-16">
          {/* Logo + description */}
          <div className="md:max-w-xs animate-fade-in">
            <img 
              src={synluaLogo} 
              alt="Synlua" 
              className="h-8 sm:h-10 md:h-12 lg:h-14 opacity-90 mb-4"
              loading="lazy"
            />
            <p className="text-sm text-[#808080] font-light leading-relaxed">
              Estratégia, dados e design para marcas que buscam escala e conversão.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 sm:gap-16 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] tracking-[0.3em] text-[#6366F1]/60 uppercase mb-4 font-mono">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm text-[#808080] hover:text-[#EDEDED] transition-colors font-light tracking-wide"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a1a2e] to-transparent mb-10 sm:mb-14" />

        {/* Giant text */}
        <div className="relative">
          <h2
            className="text-[18vw] sm:text-[16vw] md:text-[15vw] font-extralight tracking-tighter leading-none overflow-hidden bg-gradient-to-b from-[#EDEDED]/80 to-[#808080]/40 bg-clip-text text-transparent animate-fade-in"
            style={{ 
              clipPath: "inset(0 0 15% 0)",
              WebkitClipPath: "inset(0 0 15% 0)",
              animationDelay: "0.2s",
              animationFillMode: "both"
            }}
          >
            SYNLUA
          </h2>

          <div className="absolute top-1/3 sm:top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center gap-4 sm:gap-6 md:gap-8 z-10 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <a
              href="https://instagram.com/synlua"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center border border-[#1a1a2e] rounded-sm text-[#808080] hover:text-[#EDEDED] hover:border-[#6366F1]/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 bg-[#0a0a14]/60 active:scale-95"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5511945592596?text=Olá!%20Acabei%20de%20preencher%20o%20formulário.%20Quero%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center border border-[#1a1a2e] rounded-sm text-[#808080] hover:text-[#EDEDED] hover:border-[#6366F1]/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 bg-[#0a0a14]/60 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          <img 
            src={synluaLogo} 
            alt="Synlua" 
            className="h-5 sm:h-6 md:h-8 opacity-60"
            loading="lazy"
          />
          <div className="text-center">
            <p className="text-[#808080]/60 text-[10px] sm:text-xs font-mono tracking-wide">
              2026. Direitos Reservados
            </p>
            <p className="text-[#808080]/60 text-[10px] sm:text-xs font-mono tracking-wide mt-1">
              CNPJ: 63.346.429/0001-55
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GiantFooter;

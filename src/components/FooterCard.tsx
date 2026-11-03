import { openQuiz } from "@/lib/quiz";
import { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import synluaLogo from "@/assets/synlua-logo-white.webp";
import GlowButton from "@/components/ui/glow-button";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const footerColumns = [
  {
    title: "Links",
    items: [
      { label: "Home", id: "home" },
      { label: "Sobre", id: "sobre" },
      { label: "Portfólio", id: "portfolio" },
      { label: "Serviços", id: "servicos" },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      { label: "Cases", href: "#portfolio" },
    ],
  },
  {
    title: "Soluções",
    items: [
      { label: "Estratégia Digital", id: "servicos" },
      { label: "Tráfego Pago", id: "servicos" },
      { label: "Audiovisual", id: "servicos" },
      { label: "Social Media", id: "servicos" },
      { label: "Branding", id: "servicos" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: "https://instagram.com/synlua", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/synlua", label: "LinkedIn" },
];

const FooterCard = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // eslint-disable-next-line no-console
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#050508] px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-6">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-3xl border border-[#1a1a2e] bg-[#0a0a12]/80 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,90,214,0.08)_0%,transparent_55%)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c5ad6]/40 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-18">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm sm:text-base text-[#EDEDED] font-medium tracking-wide mb-4 pb-3 border-b border-[#1a1a2e]">
                    {col.title}
                  </h4>

                  <div className="flex flex-col gap-3">
                    {col.items.map((item) =>
                      "id" in item ? (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => scrollTo(item.id)}
                          className="text-sm text-[#808080] hover:text-[#EDEDED] transition-colors duration-300 text-left font-light w-fit"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          className="text-sm text-[#808080] hover:text-[#EDEDED] transition-colors duration-300 font-light w-fit"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              ))}

              <div className="sm:col-span-2 lg:col-span-2">
                <h4 className="text-sm sm:text-base text-[#EDEDED] font-medium tracking-wide mb-4 pb-3 border-b border-[#1a1a2e]">
                  Fale conosco
                </h4>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 text-sm text-[#808080] font-light">
                    <MapPin className="w-4 h-4 mt-0.5 text-[#7c5ad6] flex-shrink-0" />
                    <span>Barueri, São Paulo — Brasil</span>
                  </div>
                  <a
                    href="mailto:mkt@synlua.com.br"
                    className="flex items-center gap-3 text-sm text-[#808080] hover:text-[#EDEDED] transition-colors duration-300 font-light"
                  >
                    <Mail className="w-4 h-4 text-[#7c5ad6] flex-shrink-0" />
                    <span>mkt@synlua.com.br</span>
                  </a>
                </div>

                <div className="mt-6">
                  <h5 className="text-xs uppercase tracking-wider text-[#808080] mb-3">Newsletter</h5>
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="flex-1 min-w-0 bg-[#0c0c16] border border-[#1a1a2e] rounded-full px-4 py-2.5 text-sm text-[#EDEDED] placeholder:text-[#555] focus:border-[#bd86f5]/60 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      aria-label="Assinar newsletter"
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#7c5ad6] to-[#bd86f5] text-white flex items-center justify-center hover:shadow-[0_0_20px_-4px_rgba(189,134,245,0.6)] transition-shadow"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                <div className="flex gap-2 mt-6">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl border border-[#1a1a2e] bg-[#0c0c16] flex items-center justify-center text-[#808080] hover:text-[#EDEDED] hover:border-[#7c5ad6]/50 hover:bg-[#12121f] transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 pt-8 sm:pt-12 border-t border-[#1a1a2e] flex flex-col items-center gap-6">
              <img
                src={synluaLogo}
                alt="Synlua Marketing"
                width={320}
                height={64}
                className="h-10 sm:h-14 md:h-16 w-auto opacity-95"
                loading="lazy"
                decoding="async"
              />

              <GlowButton
                type="button"
                variant="gradient"
                onClick={() => openQuiz()}
                className="font-light text-sm px-8 py-3"
              >
                Falar com um estrategista
              </GlowButton>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center text-[11px] sm:text-xs text-[#808080]/60">
          <p>CNPJ: 63.346.429/0001-55</p>
          <p>2026 Synlua. Direitos Reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#EDEDED] transition-colors duration-300">
              Termos de Uso
            </a>
            <span className="text-[#1a1a2e]">|</span>
            <a href="#" className="hover:text-[#EDEDED] transition-colors duration-300">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCard;

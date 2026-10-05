import { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import synluaLogo from "@/assets/synlua-logo-white.webp";
import GlowButton from "@/components/ui/glow-button";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.387 3.125h-.003a6.499 6.499 0 01-6.5-6.5c0-3.59 2.91-6.5 6.5-6.5a6.507 6.507 0 016.5 6.5c0 3.59-2.91 6.5-6.5 6.5m11.7-7.5a11.5 11.5 0 00-11.7-11.5c-6.348 0-11.5 5.152-11.5 11.5 0 2.023.525 3.922 1.44 5.577L.5 23.5l5.57-1.46a11.474 11.474 0 005.93 1.642h.003a11.5 11.5 0 0011.5-11.5 11.48 11.48 0 00-1.46-5.675 11.48 11.48 0 00-5.676-1.458" />
  </svg>
);

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
  { Icon: WhatsAppIcon, href: "https://wa.me/5511932267758", label: "WhatsApp" },
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_55%)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />

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
                    <MapPin className="w-4 h-4 mt-0.5 text-[#6366F1] flex-shrink-0" />
                    <span>Barueri, São Paulo — Brasil</span>
                  </div>
                  <a
                    href="https://wa.me/5511932267758?text=Ol%C3%A1!%20Quero%20falar%20com%20a%20Synlua."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#808080] hover:text-[#EDEDED] transition-colors duration-300 font-light"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#6366F1] flex-shrink-0" />
                    <span>(11) 93226-7758</span>
                  </a>
                  <a
                    href="mailto:mkt@synlua.com.br"
                    className="flex items-center gap-3 text-sm text-[#808080] hover:text-[#EDEDED] transition-colors duration-300 font-light"
                  >
                    <Mail className="w-4 h-4 text-[#6366F1] flex-shrink-0" />
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
                      className="flex-1 min-w-0 bg-[#0c0c16] border border-[#1a1a2e] rounded-full px-4 py-2.5 text-sm text-[#EDEDED] placeholder:text-[#555] focus:border-[#8B5CF6]/60 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      aria-label="Assinar newsletter"
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] transition-shadow"
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
                      className="w-10 h-10 rounded-xl border border-[#1a1a2e] bg-[#0c0c16] flex items-center justify-center text-[#808080] hover:text-[#EDEDED] hover:border-[#6366F1]/50 hover:bg-[#12121f] transition-all duration-300"
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
                onClick={() => scrollTo("diagnostico")}
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

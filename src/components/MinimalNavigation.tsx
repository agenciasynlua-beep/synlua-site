import { openQuiz } from "@/lib/quiz";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import synluaLogoWhite from "@/assets/synlua-logo-white.webp";

const navLinks = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "portfolio", label: "Portfólio" },
];

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MinimalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      setIsScrolled(window.scrollY > 60);

      let current = "home";
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = link.id;
          }
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);


  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (id === "diagnostico") {
      openQuiz();
      return;
    }
    scrollTo(id);
  };

  return (
    <>
      <nav
        className={`nav-in fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050508]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ${
              isScrolled ? "h-[72px] md:h-[90px]" : "h-[100px] md:h-[152px]"
            }`}
          >
            <Link to="/" onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, "home")}>
              <img
                src={synluaLogoWhite}
                alt="Synlua"
                width={560}
                height={116}
                fetchPriority="high"
                decoding="async"
                className={`w-auto transition-all duration-300 ease-out origin-left ${
                  isScrolled
                    ? "h-12 sm:h-14 md:h-16"
                    : "h-28 sm:h-32 md:h-[132px]"
                }`}
              />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={"/#" + link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative text-sm font-light tracking-wide transition-colors duration-200 group ${
                    activeSection === link.id ? "text-[#EDEDED]" : "text-[#808080] hover:text-[#EDEDED]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-300 ${
                      activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="#diagnostico"
                onClick={(e) => handleNavClick(e, "diagnostico")}
                className="text-sm font-light text-[#808080] hover:text-[#EDEDED] transition-colors duration-200"
              >
                Contato
              </a>
              <a
                href="#diagnostico"
                onClick={(e) => handleNavClick(e, "diagnostico")}
                className="rounded-full bg-[#EDEDED] text-[#0a0a14] px-5 py-2.5 text-sm font-medium hover:bg-[#8B5CF6] hover:text-white transition-all duration-300 shadow-[0_0_24px_-6px_rgba(139,92,246,0)] hover:shadow-[0_0_24px_-6px_rgba(139,92,246,0.45)]"
              >
                Fale Conosco
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#EDEDED] p-2 -mr-2 z-50"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
          <div
            className="menu-in fixed inset-0 z-[100] bg-[#050508] md:hidden"
          >
            <div className="flex items-center justify-between p-4 sm:p-6">
              <img src={synluaLogoWhite} alt="Synlua" width={560} height={116} loading="lazy" decoding="async" className="h-28 sm:h-32 w-auto" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-[#EDEDED] p-2 -mr-2"
                aria-label="Fechar menu"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-[calc(100vh-90px)] gap-8 px-6">
              {navLinks.map((link, i) => (
                <a
                  key={link.id}
                  href={"/#" + link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{ animationDelay: `${0.08 * (i + 1)}s` }}
                  className={`menu-item-in text-3xl font-extralight tracking-tight transition-colors relative ${
                    activeSection === link.id ? "text-[#EDEDED]" : "text-[#808080]"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span
                      className="absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8B5CF6]"
                    />
                  )}
                </a>
              ))}
              <a
                href="#diagnostico"
                onClick={(e) => handleNavClick(e, "diagnostico")}
                style={{ animationDelay: "0.48s" }}
                className={`menu-item-in text-3xl font-extralight tracking-tight transition-colors relative ${
                  activeSection === "diagnostico" ? "text-[#EDEDED]" : "text-[#808080]"
                }`}
              >
                Contato
              </a>
              <a
                href="#diagnostico"
                onClick={(e) => handleNavClick(e, "diagnostico")}
                style={{ animationDelay: "0.58s" }}
                className="menu-item-in mt-4 rounded-full bg-[#F2F0EC] text-[#0a0a14] px-8 py-4 text-sm font-medium"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        )}
    </>
  );
};

export default MinimalNavigation;

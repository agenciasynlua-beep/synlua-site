import { Target, Video, TrendingUp, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const services = [
  {
    icon: Target,
    title: "Marketing 360",
    subtitle: "Braço de marketing completo da sua empresa",
    description:
      "Somos o departamento de marketing completo da sua empresa. Estratégia, criação, performance, social media e automação — tudo integrado para gerar resultados reais.",
  },
  {
    icon: Video,
    title: "Audiovisual",
    subtitle: "Captação e produção audiovisual",
    description:
      "Seu conteúdo com qualidade de cinema. Roteirizamos, gravamos, editamos e entregamos vídeos e fotos que posicionam sua marca em outro nível — tudo com equipe in house.",
  },
  {
    icon: TrendingUp,
    title: "Vendas",
    subtitle: "Gestão de performance e vendas",
    description:
      "Gerenciamos a sua compra de mídia. Criamos, validamos e otimizamos campanhas em Meta e Google com foco total em performance — acompanhado de relatórios claros e objetivos.",
  },
];

const scrollToForm = () => {
  document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
};

const StickyCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const topOffset = 80 + index * 30;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="mb-4 md:mb-0 md:h-[45vh] md:last:h-auto">
      <div
        className="relative md:sticky bg-white border border-[#e5e5ea] rounded-xl p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-500 hover:border-[#6366F1]/30 hover:shadow-md will-change-transform group"
        style={{ top: topOffset, zIndex: (index + 1) * 10 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:gap-10">
          <div className="flex-shrink-0 md:w-[280px] lg:w-[320px] mb-4 md:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#6366F1]/40 text-xs font-mono tracking-[0.3em]">{number}</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#6366F1]/40 to-transparent" />
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mb-4 transition-shadow duration-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#6366F1]" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-[#1a1a2e] tracking-tight mb-2">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#555] font-light uppercase tracking-wider mb-3">
              {service.subtitle}
            </p>
            <div className="w-8 h-[1px]" style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }} />
          </div>
          <div className="flex-1 flex items-center">
            <p className="text-sm sm:text-base md:text-lg text-[#666] leading-relaxed font-light">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Marketing360 = () => {
  return (
    <section data-light id="servicos" className="relative py-8 sm:py-10 md:py-12 bg-[#FAFAFA]">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 bottom-0 left-[20%] w-px bg-gradient-to-b from-transparent via-[#d4d4d8]/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-[#d4d4d8]/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[80%] w-px bg-gradient-to-b from-transparent via-[#d4d4d8]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in">
          <div className="flex justify-center">
            <SectionLabel text="PILARES" className="text-[#6366F1]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1a1a2e] leading-tight mb-4 sm:mb-6 px-2 sm:px-4">
            O que fazemos
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#555] leading-relaxed max-w-2xl mx-auto px-2">
            Estratégia, produção e performance.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {services.map((service, index) => (
            <StickyCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mt-8 sm:mt-12 px-4 animate-fade-in">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 md:px-10 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-medium text-sm tracking-wide uppercase rounded-sm transition-all duration-300 hover:from-[#5558E6] hover:to-[#7C4FEB] hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] group active:scale-[0.98]"
          >
            Fale Conosco
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Marketing360;

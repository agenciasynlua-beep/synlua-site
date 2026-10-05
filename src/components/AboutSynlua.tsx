import { ArrowRight } from "lucide-react";
import pabloAsset from "@/assets/pablo-jardim.webp.asset.json";
const pabloImage = pabloAsset.url;
import beatrizImage from "@/assets/beatriz.webp";

const founders = [
  {
    name: "Pablo Couto",
    role: "CEO & Fundador",
    description: "Responsável por funis, vendas, visão estratégica e oportunidades de crescimento.",
    image: pabloImage
  },
  {
    name: "Beatriz Azevedo",
    role: "COO & Fundadora",
    description: "Responsável pelo time interno, organização, processos e qualidade das entregas.",
    image: beatrizImage
  }
];

const scrollToForm = () => {
  document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
};

const AboutSynlua = () => {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 bg-[#080812] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/10 to-transparent" />
      <div className="absolute inset-0 opacity-[0.02] hidden sm:block">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in">
          <div className="flex items-center gap-4 justify-center mb-6">
            <span className="text-[#6366F1]/60 text-xs font-mono tracking-[0.3em]">04</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#6366F1]/40 to-transparent" />
          </div>
          <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-[#6366F1]/60 uppercase mb-4 sm:mb-6 px-3 sm:px-4 py-2 border border-[#1a1a2e] rounded-full font-mono bg-[#0a0a14]/40">
            Sobre Nós
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#EDEDED] tracking-tight mb-6 sm:mb-8">

            Quem somos
          </h2>
          
          <p className="text-sm sm:text-base text-[#808080] max-w-3xl mx-auto leading-relaxed px-2 whitespace-pre-line">
            A Synlua é uma empresa full service focada em transformar marcas através de estratégia, dados e design com foco em conversão. {"\n\n\n"}
            Combinamos criatividade e análise para entregar resultados mensuráveis que impulsionam o crescimento do seu negócio. Sendo pé no chão e fazendo o arroz e feijão bem feito.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent mb-6 sm:mb-8 md:mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="group animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.15}s`, animationFillMode: "both" }}
            >
              <div className="relative border border-[#1a1a2e] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0a14]/60 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-500 hover:border-[#6366F1]/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#6366F1]/80 uppercase font-mono">Fundador</span>
                </div>
                
                <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-0 sm:text-center">
                  <div className="relative flex-shrink-0 w-24 h-28 sm:w-48 sm:h-56 md:w-56 md:h-64 lg:w-72 lg:h-80 sm:mx-auto sm:mb-6 md:mb-8">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-light text-[#EDEDED] mb-1 sm:mb-3">
                      {founder.name}
                    </h3>
                    
                    <div className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent mx-auto mb-4" />
                    
                    <span className="inline-block text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] text-[#6366F1]/60 uppercase mb-2 sm:mb-6 font-mono">
                      {founder.role}
                    </span>
                    
                    <p className="text-xs sm:text-sm md:text-base text-[#808080] leading-relaxed sm:max-w-xs sm:mx-auto">
                      {founder.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          <button 
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 md:px-10 py-4 border border-[#1a1a2e] bg-[#0a0a14]/60 text-[#EDEDED] font-light text-sm tracking-widest uppercase rounded-sm transition-all duration-500 hover:border-[#6366F1]/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] group active:scale-[0.98]"
          >
            Fale com Nosso Time
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSynlua;

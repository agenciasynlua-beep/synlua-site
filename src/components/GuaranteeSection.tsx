import { motion } from "framer-motion";
import { ShieldCheck, FileX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "./SectionLabel";

const guarantees = [
  {
    icon: FileX,
    title: "Sem Multa Rescisória",
    description: "Cancele o contrato quando quiser, sem multas, sem taxas escondidas e sem burocracia.",
  },
  {
    icon: ShieldCheck,
    title: "90 Dias de Garantia de Satisfação",
    description: "Se nos primeiros 90 dias você não estiver satisfeito com os resultados, devolvemos seu investimento.",
  },
];

const GuaranteeSection = () => {
  return (
    <section data-light className="relative py-16 sm:py-20 md:py-28 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4d4d8]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4d4d8]/60 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <SectionLabel text="SUA_SEGURANÇA" className="text-[#6366F1]" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-[#050505] mt-4 sm:mt-6 leading-tight">
            Sem risco.{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent">Sem surpresas.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-2xl mx-auto mt-4">
            Acreditamos tanto no nosso trabalho que eliminamos todas as barreiras para você começar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10 sm:mb-14">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white border border-[#e5e5ea] group-hover:border-emerald-500/30 rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#050505] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white border border-emerald-500/20 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ShieldCheck className="w-7 h-7 text-emerald-500" />
              <span className="text-lg sm:text-xl font-semibold text-emerald-600 tracking-tight">
                Garantia Synlua
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#666] leading-relaxed mb-6">
              Contrato sem multa rescisória e com garantia de 90 dias de satisfação. 
              Se não estiver feliz, você cancela sem custo nenhum.
            </p>
            <Link
              to="/#diagnostico"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white font-medium text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.97] group/btn"
            >
              Começar Sem Risco
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;

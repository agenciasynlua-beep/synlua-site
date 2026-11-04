import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Users, Briefcase, Star, Package } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import synluaLogoHorizontal from "@/assets/synlua-logo-horizontal.webp";
import CollaboratorOnboarding from "@/components/CollaboratorOnboarding";
import InfluencerOnboarding from "@/components/InfluencerOnboarding";
import SupplierOnboarding from "@/components/SupplierOnboarding";
import ClientOnboarding from "@/components/ClientOnboarding";

type UserRole = "cliente" | "colaborador" | "influenciador" | "fornecedor" | null;

const roleOptions = [
  { key: "cliente" as const, label: "Cliente", icon: Briefcase, desc: "Sou cliente da Synlua" },
  { key: "influenciador" as const, label: "Influenciador(a)", icon: Star, desc: "Sou influenciador(a) parceiro(a)" },
  { key: "fornecedor" as const, label: "Fornecedor", icon: Package, desc: "Sou fornecedor / prestador de serviço" },
  { key: "colaborador" as const, label: "Colaborador(a)", icon: Users, desc: "Faço parte do time Synlua" },
];

const OnboardingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isSelectingRole, setIsSelectingRole] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setIsSelectingRole(true);
    setTimeout(() => {
      setIsSelectingRole(false);
      setUserRole(role);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#7c5ad6]/30">
        <SEOHead
          title="Login | Synlua — Braço de Marketing Completo"
          description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua."
          path="/onboarding"
          noindex
        />
        <div className="w-full max-w-md px-6 text-center">
          <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-10" />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle2 className="w-14 h-14 text-[#7c5ad6] mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl font-light text-white/80 mb-3"
          >
            Login realizado com sucesso
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-white/30 font-light mb-8"
          >
            Redirecionando para o seu painel...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Loader2 className="w-5 h-5 animate-spin text-[#7c5ad6]/50 mx-auto" />
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── ROLE SELECTION ───
  if (isAuthenticated && !userRole) {
    return (
      <main className="min-h-screen bg-[#050508] flex items-center justify-center selection:bg-[#7c5ad6]/30">
        <SEOHead title="Perfil | Synlua — Braço de Marketing Completo" description="Time de especialistas em Marketing 360 que cuida da sua estratégia, conteúdo, tráfego e conversão. Fale com um estrategista da Synlua." path="/onboarding" noindex />
        <div className="w-full max-w-lg px-6">
          <div className="text-center mb-10">
            <img src={synluaLogoHorizontal} alt="Synlua" className="h-12 sm:h-14 mx-auto mb-8" />
          </div>

          {isSelectingRole ? (
            <div className="flex flex-col items-center gap-4 py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#7c5ad6]" />
              <p className="text-white/40 text-sm font-light">Preparando seu painel...</p>
            </div>
          ) : (
            <div className="border border-white/[0.08] rounded-lg p-8 bg-white/[0.02]">
              <h1 className="text-xl font-light text-white/80 text-center mb-8">Você é:</h1>
              <div className="space-y-3">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleRoleSelect(opt.key)}
                    className="w-full flex items-center gap-4 p-5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:border-[#7c5ad6]/50 hover:bg-[#7c5ad6]/[0.05] transition-all duration-400 text-left group"
                  >
                    <opt.icon className="w-5 h-5 text-white/30 group-hover:text-[#7c5ad6] transition-colors flex-shrink-0" />
                    <div>
                      <p className="text-base text-white/80 font-light">{opt.label}</p>
                      <p className="text-sm text-white/30 font-light">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ─── INFLUENCIADOR ───
  if (userRole === "influenciador") {
    return <InfluencerOnboarding />;
  }

  // ─── FORNECEDOR ───
  if (userRole === "fornecedor") {
    return <SupplierOnboarding />;
  }

  // ─── COLABORADOR ───
  if (userRole === "colaborador") {
    return <CollaboratorOnboarding />;
  }

  // ─── CLIENTE ───
  return <ClientOnboarding />;
};

export default OnboardingPage;

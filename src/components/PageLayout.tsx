import MinimalNavigation from "@/components/MinimalNavigation";
import GiantFooter from "@/components/GiantFooter";
import DiagnosticCTA from "@/components/DiagnosticCTA";
import ScrollProgress from "@/components/ScrollProgress";

interface PageLayoutProps {
  children: React.ReactNode;
  showCTA?: boolean;
}

const PageLayout = ({ children, showCTA = true }: PageLayoutProps) => {
  return (
    <main className="min-h-screen bg-[#050505]">
      <MinimalNavigation />
      <ScrollProgress />
      {children}
      {showCTA && <DiagnosticCTA />}
      <GiantFooter />
    </main>
  );
};

export default PageLayout;

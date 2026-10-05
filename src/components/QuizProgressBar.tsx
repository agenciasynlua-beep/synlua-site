import { motion } from "framer-motion";
import { User, Building2, Target, CheckCircle, Check } from "lucide-react";

interface QuizProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepIcons = [User, Building2, Target, CheckCircle];
const stepLabels = ["Contato", "Empresa", "Serviços", "Confirma"];

const QuizProgressBar = ({ currentStep, totalSteps }: QuizProgressBarProps) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
      <div className="relative flex justify-between items-center">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#1a1a1a] mx-5 sm:mx-8" />
        
        {/* Animated progress line */}
        <motion.div 
          className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#666] via-[#888] to-[#EDEDED]"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100)}%`,
            maxWidth: "calc(100% - 2.5rem)"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Step indicators */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const Icon = stepIcons[i];
          const isCompleted = currentStep > i + 1;
          const isActive = currentStep === i + 1;
          
          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, type: "spring" }}
                className="relative"
              >
                {/* Glow effect for active step */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#EDEDED]/20 blur-lg"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Step circle - smaller on mobile */}
                <motion.div
                  animate={{ 
                    backgroundColor: isCompleted || isActive ? "#EDEDED" : "#0a0a0a",
                    borderColor: isCompleted || isActive ? "#EDEDED" : "#333"
                  }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative overflow-hidden ${
                    isActive ? "shadow-[0_0_20px_rgba(237,237,237,0.3)]" : ""
                  }`}
                >
                  {/* Inner gradient for active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  )}
                  
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#050505]" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-[#050505]" : "text-[#666]"}`} />
                  )}
                </motion.div>
              </motion.div>
              
              {/* Step label - always visible, responsive text */}
              <motion.span
                animate={{ 
                  color: isActive ? "#EDEDED" : isCompleted ? "#888" : "#555",
                  fontWeight: isActive ? 500 : 400
                }}
                className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 whitespace-nowrap"
              >
                {stepLabels[i]}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizProgressBar;

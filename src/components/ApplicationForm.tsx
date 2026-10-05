import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";

const Logo3D = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame(state => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} scale={1.5}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="#EDEDED" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const ApplicationForm = () => {
  return (
    <section id="diagnostico" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#050505] border-t border-[#262626] overflow-hidden">
      {/* 3D Logo Background - desktop only */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 w-64 h-64 opacity-20 hidden xl:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Logo3D />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Subtle gradient for mobile instead of 3D */}
      <div className="absolute inset-0 bg-gradient-radial from-[#808080]/5 via-transparent to-transparent xl:hidden" />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-8"
      >
        <div className="flex justify-center">
          <SectionLabel text="INICIE_SUA_TRANSFORMAÇÃO" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-[#EDEDED] leading-tight mb-4 sm:mb-6">
              Pronto para<br />
              <span className="text-[#808080]">Escalar</span> Seus Resultados?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#808080] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Responda algumas perguntas rápidas e agende uma conversa estratégica com nosso time.
            </p>
          </motion.div>

          {/* CTA Button - full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-4 sm:px-0"
          >
            <Link
              to="/quiz"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#EDEDED] text-[#050505] font-medium text-sm sm:text-base tracking-wide uppercase rounded-lg transition-all duration-300 hover:bg-[#d0d0d0] hover:scale-105 hover:shadow-[0_0_40px_rgba(237,237,237,0.2)] group active:scale-[0.98]"
            >
              Quero Escalar Meus Resultados
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust indicators - stack vertically on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[#666] text-xs sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Resposta em menos de 2 minutos
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Sem compromisso
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;

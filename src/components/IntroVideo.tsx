import { useState, useRef } from "react";

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Esta función se ejecuta al presionar el botón de inicio de la experiencia
  const startExperience = () => {
    setHasInteracted(true);
    
    // Le damos un micro-timeout para asegurar que el DOM procese la renderización del video
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false; // 🔊 ¡AUDIO TOTALMENTE PERMITIDO POR EL NAVEGADOR!
        videoRef.current.play().catch((err) => console.log("Error al reproducir:", err));
      }
    }, 50);
  };

  // 1. PANTALLA DE INGRESO (Satisface la seguridad del navegador con un toque Premium)
  if (!hasInteracted) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020b13] select-none animate-fade-in">
        {/* Glow de fondo futurista */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Tu Logo Centrado */}
        <img
          src="/assets/logo-exe.webp"
          alt="EXE Studio Logo"
          width={358}
          height={200}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-24 w-auto object-contain mb-8 animate-pulse"
        />

        {/* Botón de Inicialización de Sistemas */}
        <button
          onClick={startExperience}
          className="px-8 py-3 border border-cyan-500/40 bg-cyan-950/20 text-cyan-400 text-sm font-space uppercase tracking-[0.25em] rounded backdrop-blur-md hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
        >
          INICIAR SISTEMA //
        </button>
      </div>
    );
  }

  // 2. LA INTRO CINEMÁTICA (Ya con el audio desbloqueado gracias al clic previo)
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none">
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover"
        src="/video/present-2.webm"
        autoPlay
        playsInline
        onEnded={onVideoEnd}
      />
      
      {/* Botón para saltar directo a la web */}
      <button
        onClick={onVideoEnd}
        className="absolute bottom-8 right-8 z-[10000] px-5 py-2 border border-white/20 bg-black/40 text-white/80 text-xs uppercase tracking-[0.2em] rounded backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
      >
        SALTAR INTRO //
      </button>
    </div>
  );
}
import { useEffect, useRef } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import gsap from 'gsap';

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const setModalOpen = useQuoteStore((s) => s.setModalOpen);


  // Text animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate title characters
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.set(chars, { y: '120%', opacity: 0 });
      tl.to(chars, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: { amount: 0.6, from: 'random' },
        ease: 'power4.out',
      });
    }

    // Subtitle fade
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }

    // CTAs fade
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, []);

  const splitChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  // CORRECCIÓN: Se eliminó 'bg-fixed' para que la imagen suba con el scroll
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#020b13] bg-[url('/assets/f1.webp')] bg-cover bg-center bg-no-repeat">

      {/* Dynamic Animated Grid & Glowing Blobs Background */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Repeating grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Glowing Blobs */}
        <div className="absolute w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-teal-500/10 blur-[80px] sm:blur-[120px] mix-blend-screen animate-blob-1 -top-[10%] -left-[10%]" />
        <div className="absolute w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-cyan-500/10 blur-[80px] sm:blur-[120px] mix-blend-screen animate-blob-2 -bottom-[10%] -right-[10%]" />
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-600/5 blur-[80px] sm:blur-[100px] mix-blend-screen animate-blob-3 top-[30%] left-[30%]" />
      </div>

      {/* Vignette overlay */}
      {/* MEJORA: Cambiado de /50 a /70 para oscurecer un poco más el fondo y hacer que el texto verde y el subtítulo resalten al máximo */}
      <div className="absolute inset-0 z-[2] bg-[#020b13]/70" />

      {/* Center Glow */}
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Resto de tu código (El contenedor z-10 de tus textos permanece idéntico) */}

      {/* Content */}
      <div className="relative z-10 container-main text-center flex flex-col items-center ">
        {/* Label */}
        {/* CAMBIO: Se sugiere asegurar un color vibrante (ej. text-emerald-400) o mantener tu variable si es un tono fuerte */}
        <p className="font-inter font-black text-sm uppercase tracking-[0.2em] text-emerald-400 mb-6 animate-[fadeIn_1s_ease_0.5s_forwards]">
          Agencia de Desarrollo Web
        </p>

        {/* Title */}
        <div ref={titleRef} className="overflow-hidden mb-8">
          <h1 className="font-space font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[8vw] leading-[1.05] tracking-[-0.02em] text-white">
            <span className="block overflow-hidden">
              {splitChars('NUEVA ERA')}
            </span>
            <span className="block overflow-hidden">
              {splitChars('DIGITAL')}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="max-w-2xl mx-auto mb-10">
          {/* CAMBIO: Cambiado font-light por font-medium, y text-slate-text por un blanco con opacidad (text-white/80) */}
          <p className="font-inter font-medium text-base sm:text-lg lg:text-xl leading-relaxed text-white/80 class-shadow">
            Creamos experiencias digitales que transforman negocios.
          </p>
        </div>


        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="group font-inter font-medium text-sm uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            Solicitar Cotización
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <a
            href="#proyectos"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector('#proyectos')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-inter font-medium text-sm uppercase tracking-[0.1em] border border-white/30 text-white px-8 py-4 rounded-full hover:border-cyan-accent hover:text-cyan-accent transition-all duration-300"
          >
            Ver Proyectos
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-gentle">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>


    </section>
  );
}

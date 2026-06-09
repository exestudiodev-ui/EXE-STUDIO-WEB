import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/SectionLabel';

const STEPS = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Sumergimos en tu negocio para entender tus objetivos, audiencia y competencia. Cada gran producto comienza con una comprensión profunda.',
    activities: [
      'Análisis de requisitos y objetivos de negocio',
      'Investigación de usuarios y competencia',
      'Definición de KPIs y métricas de éxito',
      'Arquitectura de información y flujos',
    ],
    duration: '1-2 SEMANAS',
  },
  {
    number: '02',
    title: 'Diseño',
    description:
      'Transformamos insights en interfaces excepcionales. Cada píxel tiene un propósito, cada interacción cuenta una historia.',
    activities: [
      'Wireframes y prototipos interactivos',
      'Diseño UI/UX con sistema de diseño',
      'Iteración basada en feedback',
      'Handoff con especificaciones técnicas',
    ],
    duration: '2-3 SEMANAS',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Código limpio, arquitectura sólida y tecnologías de vanguardia. Construimos productos que escalan y perduran.',
    activities: [
      'Sprints ágiles con entregas quincenales',
      'Code reviews y testing automatizado',
      'Integración continua y despliegue',
      'Optimización de rendimiento y SEO',
    ],
    duration: '4-12 SEMANAS',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    description:
      'Tu producto en manos de usuarios reales. Monitoreamos, optimizamos y garantizamos el éxito desde el día uno.',
    activities: [
      'Despliegue en infraestructura productiva',
      'Monitoreo y analytics en tiempo real',
      'Soporte post-lanzamiento',
      'Iteración continua basada en datos',
    ],
    duration: 'CONTINUO',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    // 1. Añadido 'overflow-hidden' y fondo base oscuro para que la imagen no rompa los bordes al crecer
    <section ref={sectionRef} id="proceso" className="section-padding relative overflow-hidden bg-slate-950">
      
      {/* 2. CAPA INDEPENDIENTE DE IMAGEN ANIMADA Y OSCURECIDA */}
            {/* CAPA DE IMAGEN CON DESENFOQUE Y UN COLAZO DE OSCURIDAD EQUILIBRADO */}
      <div 
        className="section-kenburns absolute inset-0 bg-[url('/assets/f11.webp')] bg-cover bg-center bg-no-repeat brightness-50 contrast-100 blur-[2px] pointer-events-none"
        style={{ 
          animation: 'kenBurnsEffect 25s infinite alternate ease-in-out',
          willChange: 'transform'
        }}
      />
      {/* CAPA EXTRA: Degradado oscuro para blindar la legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 pointer-events-none" />


      {/* 3. El contenedor original ahora tiene 'relative z-10' para flotar por encima de la imagen */}
      <div className="container-main relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <SectionLabel number="03" text="PROCESO" />
          <h2 className="font-space font-bold text-4xl sm:text-5xl lg:text-[5vw] text-white leading-tight mb-4">
            Nuestro Método de Trabajo
          </h2>
          <p className="font-inter font-light text-base lg:text-lg text-slate-text leading-relaxed">
            Un proceso refinado en cientos de proyectos para garantizar
            resultados excepcionales.
          </p>
        </div>

        {/* Process Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
          {/* Left: Sticky Step Indicators */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              {/* Progress Line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-white/10">
                <div
                  className="w-full bg-gradient-to-b from-cyan-accent to-teal-accent transition-all duration-500"
                  style={{
                    height: `${((activeStep + 1) / STEPS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Step Indicators */}
              <div className="relative space-y-10">
                {STEPS.map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex items-center gap-4 transition-all duration-500 ${
                      index === activeStep
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-space font-bold text-lg transition-all duration-500 ${
                        index === activeStep
                          ? 'bg-cyan-accent text-deep-space shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`font-inter font-medium text-sm uppercase tracking-[0.1em] transition-colors duration-500 ${
                        index === activeStep
                          ? 'text-white'
                          : 'text-white/50'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Step Details */}
          <div className="space-y-24 lg:space-y-32">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[index] = el; }}
                className="scroll-mt-32"
              >
                <div className="flex items-center gap-4 mb-6 lg:hidden">
                  <div className="w-10 h-10 rounded-full bg-cyan-accent text-deep-space flex items-center justify-center font-space font-bold">
                    {step.number}
                  </div>
                  <span className="font-inter font-medium text-sm uppercase tracking-[0.1em] text-white">
                    {step.title}
                  </span>
                </div>

                <h3 className="font-space font-bold text-2xl lg:text-3xl text-white mb-4">
                  {step.number}. {step.title}
                </h3>
                <p className="font-inter font-light text-base text-slate-text leading-relaxed mb-6 max-w-xl">
                  {step.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {step.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex items-start gap-3 text-slate-text"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-2 flex-shrink-0" />
                      <span className="font-inter text-sm">{activity}</span>
                    </li>
                  ))}
                </ul>

                <span className="inline-block font-inter font-medium text-xs uppercase bg-cyan-accent/10 text-cyan-accent px-4 py-2 rounded-full">
                  {step.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

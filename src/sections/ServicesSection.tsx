import { useEffect, useRef, useState } from 'react';
import {
  Monitor,
  Layers,
  ShoppingCart,
  Cloud,
  Brain,
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { SERVICES_DETAILS, type ServiceDetail } from '@/services/servicesData';
import { useQuoteStore } from '@/store/quoteStore';
import { INTRO_READY_EVENT } from '@/hooks/useIntroReady';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor, Layers, ShoppingCart, Cloud, Brain, Compass,
};

const SERVICES = [
  {
    icon: Monitor,
    title: 'Landing Pages Premium',
    description:
      'Páginas de conversión diseñadas para cautivar y convertir. Cada elemento está estratégicamente diseñado para maximizar resultados.',
    stat: '+300% conversión promedio',
    tall: true,
  },
  {
    icon: Layers,
    title: 'Sistemas Web Integrados',
    description:
      'Plataformas empresariales conectadas con tus sistemas existentes. ERP, CRM y APIs trabajando en armonía.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce de Alta Escala',
    description:
      'Tiendas online que manejan millones de transacciones. Rendimiento optimizado para picos de tráfico extremos.',
  },
  {
    icon: Cloud,
    title: 'Aplicaciones SaaS',
    description:
      'Software como servicio desde cero. Arquitectura multi-tenant, escalable y segura para modelos de suscripción.',
  },
  {
    icon: Brain,
    title: 'Automatización con IA',
    description:
      'Integración de inteligencia artificial para automatizar procesos, generar contenido y potenciar la toma de decisiones.',
  },
  {
    icon: Compass,
    title: 'Consultoría Tecnológica',
    description:
      'Asesoramiento estratégico para la transformación digital. Definimos la hoja de ruta tecnológica de tu negocio.',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openQuoteModal = useQuoteStore((s) => s.openQuoteModal);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const initAnimations = () => {
      if (!sectionRef.current || !cardsRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current!.querySelectorAll('[data-header]'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );

        const cards = cardsRef.current!.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      });
    };

    initAnimations();

    const handler = () => {
      ctx?.revert();
      initAnimations();
    };
    window.addEventListener(INTRO_READY_EVENT, handler);
    return () => {
      ctx?.revert();
      window.removeEventListener(INTRO_READY_EVENT, handler);
    };
  }, []);

  const handleCardClick = (title: string) => {
    const detail = SERVICES_DETAILS.find((s) => s.title === title);
    if (detail) {
      setSelectedService(detail);
      setIsSheetOpen(true);
    }
  };

  const handleStartQuote = () => {
    if (!selectedService) return;
    setIsSheetOpen(false);
    const description = `Servicio de interés: ${selectedService.title}\n\n${selectedService.extendedDescription}`;
    openQuoteModal(description);
  };

  const SelectedIcon = selectedService ? (ICON_MAP[selectedService.iconName] || Monitor) : Monitor;

  return (
    // 1. Añadido 'overflow-hidden' y fondo base oscuro para que actúe de capa base
    <section ref={sectionRef} id="servicios" className="section-padding relative overflow-hidden bg-slate-950">
      
      {/* 2. CAPA DE IMAGEN CON DESENFOQUE, MOVIMIENTO EQUILIBRADO Y MÁS DETALLE */}
      <div 
        className="section-kenburns absolute inset-0 bg-[url('/assets/f12.webp')] bg-cover bg-center bg-no-repeat brightness-50 contrast-100 blur-[2px] pointer-events-none"
        style={{ 
          animation: 'kenBurnsEffect 25s infinite alternate ease-in-out',
          willChange: 'transform'
        }}
      />
      {/* 3. CAPA EXTRA DE DEGRADADO: Mantiene estables las cajas de 'glass-card' del bento grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 pointer-events-none" />

      {/* 4. Contenedor principal con z-10 para flotar sobre las capas visuales de fondo */}
      <div className="container-main relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 ">
          <div data-header>
            <SectionLabel number="01" text="SERVICIOS" />
          </div>
          <h2
            data-header
            className="font-space font-bold text-4xl sm:text-5xl lg:text-[5vw] text-white leading-tight mb-4"
          >
            Soluciones Digitales de Clase Mundial
          </h2>
          <p
            data-header
            className="font-inter font-light text-base lg:text-lg text-slate-text leading-relaxed"
          >
            Desde landing pages hasta plataformas enterprise, construimos
            productos digitales que generan resultados.{' '}
            <span className="text-cyan-accent/70">Haz clic en una tarjeta para explorar el servicio.</span>
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                onClick={() => handleCardClick(service.title)}
                className={`service-card glass-card p-6 lg:p-8 group hover:bg-white/[0.08] hover:border-cyan-accent/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300 cursor-pointer ${
                  service.tall ? 'md:row-span-2' : ''
                }`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <Icon
                        className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-accent group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-cyan-accent font-space flex items-center gap-1">
                        Ver más <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="font-space font-bold text-lg lg:text-xl text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="font-inter font-light text-sm text-slate-text leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  {service.stat && (
                    <p className="font-inter font-medium text-sm text-cyan-accent mt-6 pt-4 border-t border-white/10">
                      {service.stat}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="bg-[#020b13]/98 border-l border-white/10 text-white w-full sm:max-w-lg md:max-w-xl h-full flex flex-col p-0 overflow-hidden backdrop-blur-xl"
        >
          {selectedService && (
            <>
              <div className="p-6 md:p-8 border-b border-white/10 flex-shrink-0">
                <SheetHeader className="p-0">
                  <div className="flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center flex-shrink-0">
                      <SelectedIcon className="w-6 h-6 text-cyan-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="font-space font-bold text-xs uppercase bg-cyan-accent/10 text-cyan-accent px-3 py-1 rounded-full tracking-[0.05em]">
                        
                      </span>
                      <SheetTitle className="font-space font-bold text-2xl md:text-3xl text-white mt-2">
                        {selectedService.title}
                      </SheetTitle>
                    </div>
                  </div>
                  <SheetDescription className="font-inter font-light text-sm md:text-base text-slate-text leading-relaxed pt-2">
                    
                  </SheetDescription>
                </SheetHeader>
              </div>

              {/* Contenido scrolleable del Sheet */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                <div>
                  <h4 className="font-space font-bold text-sm uppercase text-white tracking-[0.1em] mb-4 flex items-center gap-2">
                    Descripción
                  </h4>
                  <p className="font-inter font-light text-sm text-slate-text leading-relaxed">
                    {selectedService.extendedDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-accent flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-text font-inter uppercase tracking-wider">Tiempo Estimado</p>
                      <p className="text-xs font-semibold font-space text-white mt-0.5">{selectedService.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-teal-accent flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-text font-inter uppercase tracking-wider">Calidad</p>
                      <p className="text-xs font-semibold font-space text-white mt-0.5">Garantía Premium</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-space font-semibold text-sm uppercase tracking-wider text-cyan-accent mb-3">
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.suggestedStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1.5 rounded-full text-xs font-inter bg-white/5 border border-white/10 hover:border-cyan-accent/30 transition-colors inline-flex gap-1.5 items-center"
                      >
                        <span className="text-white font-medium">{tech.name}</span>
                        <span className="text-[9px] text-teal-accent uppercase">{tech.category}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-space font-semibold text-sm uppercase tracking-wider text-cyan-accent mb-3">
                    Beneficios Clave
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.keyBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-cyan-accent mt-0.5 flex-shrink-0" />
                        <span className="font-inter text-sm text-slate-text leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-space font-semibold text-sm uppercase tracking-wider text-cyan-accent mb-3">
                    Entregables
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-accent flex-shrink-0" />
                        <span className="font-inter text-sm text-slate-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-white/10 bg-[#020b13] flex-shrink-0">
                <button
                  onClick={handleStartQuote}
                  className="w-full font-inter font-semibold text-xs uppercase tracking-wider bg-cyan-accent text-deep-space py-4 rounded-full hover:bg-cyan-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2"
                >
                  Cotizar este Servicio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

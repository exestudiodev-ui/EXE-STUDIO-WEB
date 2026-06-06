import { useEffect, useRef } from 'react';
import { SectionLabel } from '@/components/SectionLabel';
import { useQuoteStore } from '@/store/quoteStore';
import { Clock, Shield, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRUST_BADGES = [
  { icon: Clock, text: 'Respuesta en 24h' },
  { icon: Shield, text: 'Sin compromiso' },
  { icon: Lock, text: 'Precio referencial' },
];

export function QuoteEngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const setModalOpen = useQuoteStore((s) => s.setModalOpen);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('[data-reveal]'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cotizar"
      className="section-padding bg-ocean-blue relative py-24"
    >
      <div className="container-main text-center">
        <div data-reveal>
          <SectionLabel number="05" text="COTIZACIÓN" />
        </div>
        
        <h2
          data-reveal
          className="font-space font-bold text-4xl sm:text-5xl lg:text-[4.5vw] text-white leading-tight mb-6"
        >
          Impulsa tu Proyecto Digital
        </h2>
        
        <p
          data-reveal
          className="font-inter font-light text-base lg:text-lg text-slate-text leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Estamos listos para materializar tu idea con tecnología de vanguardia. 
          Solicita una cotización formal y personalizada para tu negocio de manera inmediata.
        </p>

        {/* Botón Call to Action para abrir el formulario modal */}
        <div data-reveal className="mb-16">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="font-inter font-medium text-sm uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 inline-flex items-center gap-2 group"
          >
            Solicitar Cotización Detallada
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>

        {/* Mantenemos tus Trust Badges intactos */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.text}
                className="glass-card px-6 py-4 flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-xl"
              >
                <Icon className="w-5 h-5 text-cyan-accent" strokeWidth={1.5} />
                <span className="font-inter text-sm text-white/90">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
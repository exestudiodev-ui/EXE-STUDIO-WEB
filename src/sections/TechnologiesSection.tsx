import { useEffect, useRef } from 'react';
import { SectionLabel } from '@/components/SectionLabel';
import { INTRO_READY_EVENT } from '@/hooks/useIntroReady';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    gradient: 'from-cyan-accent/20 via-teal-accent/10 to-transparent',
    techs: [
      'React',
      'Next.js',
      'TypeScript',
      'Vue.js',
      'Angular',
      'Tailwind CSS',
      'Three.js',
      'WebGL',
    ],
    speed: 0.9,
  },
  {
    title: 'Backend',
    gradient: 'from-teal-accent/20 via-light-cyan/10 to-transparent',
    techs: [
      'Node.js',
      'Python',
      'Go',
      'PostgreSQL',
      'MongoDB',
      'GraphQL',
      'REST APIs',
      'Microservicios',
    ],
    speed: 1.0,
  },
  {
    title: 'Cloud & DevOps',
    gradient: 'from-light-cyan/20 via-cyan-accent/10 to-transparent',
    techs: [
      'AWS',
      'Google Cloud',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Terraform',
      'Serverless',
      'Edge CDN',
    ],
    speed: 1.1,
  },
];

export function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

        const cards = cardsRef.current!.querySelectorAll('.tech-card');
        cards.forEach((card, i) => {
          const speed = TECH_CATEGORIES[i]?.speed || 1;
          gsap.fromTo(
            card,
            { y: 100, opacity: 0, rotateX: -10 },
            {
              y: 0, opacity: 1, rotateX: 0, duration: 1.2, delay: i * 0.2, ease: 'power3.out',
              scrollTrigger: { trigger: cardsRef.current, start: 'top 70%' },
            }
          );
          gsap.to(card, {
            y: () => (speed - 1) * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1,
            },
          });
        });
      });
    };

    initAnimations();
    const handler = () => { ctx?.revert(); initAnimations(); };
    window.addEventListener(INTRO_READY_EVENT, handler);
    return () => { ctx?.revert(); window.removeEventListener(INTRO_READY_EVENT, handler); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="section-padding pb-28 md:pb-20 bg-ocean-blue relative overflow-hidden z-10"
    >
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div data-header>
            <SectionLabel number="02" text="TECNOLOGÍAS" />
          </div>
          <h2
            data-header
            className="font-space font-bold text-4xl sm:text-5xl lg:text-[5vw] text-white leading-tight mb-4"
          >
            Stack Tecnológico de Élite
          </h2>
          <p
            data-header
            className="font-inter text-base lg:text-lg text-slate-text leading-relaxed"
          >
            Trabajando con las tecnologías más avanzadas y nuevas del mercado para
            construir productos de calidad.
          </p>
        </div>

        {/* Tech Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 perspective-1000"
        >
          {TECH_CATEGORIES.map((cat, index) => (
            <div
              key={cat.title}
              className="tech-card glass-card p-6 lg:p-8 relative overflow-hidden group"
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
              />
              <div
                className="tech-conic-gradient absolute inset-0 opacity-20"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, #00d4ff 0deg, #00b894 ${
                    90 + index * 30
                  }deg, transparent ${180 + index * 30}deg, #00d4ff 360deg)`,
                  animation: `gradient-rotate ${8 + index * 2}s linear infinite`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <p className="font-inter font-medium text-xs uppercase tracking-[0.15em] text-teal-accent mb-2">
                  Categoría
                </p>
                <h3 className="font-space font-bold text-2xl lg:text-3xl text-white mb-6">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech, i) => (
                    <span
                      key={tech}
                      className="font-inter text-sm text-slate-text hover:text-white transition-colors duration-200"
                    >
                      {tech}
                      {i < cat.techs.length - 1 && (
                        <span className="ml-2 text-slate-text/50">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

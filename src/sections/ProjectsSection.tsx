import { useEffect, useRef } from 'react';
import { SectionLabel } from '@/components/SectionLabel';
import { INTRO_READY_EVENT } from '@/hooks/useIntroReady';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Fintech Nova',
    description:
      'Plataforma financiera completa con dashboards en tiempo real, integración bancaria y análisis de datos avanzado.',
    image: '/assets/projects/fintech-nova.webp',
    techs: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    title: 'Luxe Commerce',
    description:
      'E-commerce de lujo con experiencia de compra inmersiva, personalización con IA y pagos globales.',
    image: '/assets/projects/luxe-commerce.webp',
    techs: ['Next.js', 'Shopify', 'Stripe', 'AI'],
  },
  {
    title: 'HealthConnect',
    description:
      'Telemedicina enterprise con videollamadas HIPAA, gestión de citas y prescripciones digitales.',
    image: '/assets/projects/healthconnect.webp',
    techs: ['Vue.js', 'Python', 'GCP', 'WebRTC'],
  },
  {
    title: 'DataVision',
    description:
      'Dashboard analítico empresarial con visualizaciones 3D, reportes automatizados y alertas inteligentes.',
    image: '/assets/projects/datavision.webp',
    techs: ['React', 'D3.js', 'GraphQL', 'Docker'],
  },
  {
    title: 'EduPro',
    description:
      'Plataforma educativa con clases en vivo, evaluaciones adaptativas y certificación blockchain.',
    image: '/assets/projects/edupro.webp',
    techs: ['Next.js', 'Node.js', 'MongoDB', 'Blockchain'],
  },
  {
    title: 'SmartCity',
    description:
      'Dashboard IoT para gestión urbana con monitoreo en tiempo real de tráfico, energía y seguridad.',
    image: '/assets/projects/smartcity.webp',
    techs: ['React', 'Go', 'AWS IoT', 'Kubernetes'],
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const initAnimations = () => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current!.querySelectorAll('[data-header]'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        const cards = sectionRef.current!.querySelectorAll('.project-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 80%' },
            }
          );
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
      id="proyectos"
      className="section-padding bg-deep-space relative"
    >
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div data-header>
            <SectionLabel number="04" text="PROYECTOS" />
          </div>
          <h2
            data-header
            className="font-space font-bold text-4xl sm:text-5xl lg:text-[5vw] text-white leading-tight mb-4"
          >
            Proyectos Destacados
          </h2>
          <p
            data-header
            className="font-inter font-light text-base lg:text-lg text-slate-text leading-relaxed"
          >
            Una selección de nuestros trabajos más ambiciosos para clientes
            exigentes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-24">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={project.title}
                className={`project-card grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="gradient-border-card p-1 overflow-hidden group cursor-pointer">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={1344}
                        height={768}
                        loading="lazy"
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <h3 className="font-space font-bold text-2xl lg:text-3xl text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="font-inter font-light text-sm text-slate-text leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="font-inter font-medium text-xs uppercase bg-cyan-accent/10 text-cyan-accent px-3 py-1.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="font-inter font-medium text-sm text-cyan-accent hover:underline inline-flex items-center gap-2 group/link">
                    Ver Proyecto
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

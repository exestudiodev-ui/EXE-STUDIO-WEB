import { useState, useRef, useEffect } from 'react';
import { SectionLabel } from '@/components/SectionLabel';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { contactService } from '@/services/contactService';
import { toast } from 'sonner';
import { INTRO_READY_EVENT } from '@/hooks/useIntroReady';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'EMAIL DIRECTO',
    value: 'exestudio.dev@gmail.com',
    href: 'mailto:exestudio.dev@gmail.com?subject=Cotizaci%C3%B3n%20de%20Proyecto%20-%20EXE%20Studio&body=Hola%20equipo%20de%20EXE%20Studio%2C%0A%0AMe%20pongo%20en%20contacto%20con%20ustedes%20porque%20estoy%20interesado%20en%20desarrollar%20un%20proyecto%20tecnol%C3%B3gico.%0A%0A%5B%20Por%20favor%2C%20detalla%20aqu%C3%AD%20brevemente%20tu%20idea%20o%20necesidad%20%5D%0A%0AAtentamente%2C%0A%5B%20Tu%20Nombre%20%5D',
    isWhatsApp: false,
    isEmail: true,
  },
  {
    icon: Phone,
    label: 'WHATSAPP DIRECTO',
    value: '+51 942 108 694',
    href: 'https://wa.me/51942108694?text=Hola%20EXE%20Studio,%20vengo%20desde%20la%20web%20y%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios%20de%20desarrollo.',
    isWhatsApp: true,
    isEmail: false,
  },
  {
    icon: MapPin,
    label: 'UBICACIÓN',
    value: 'La Libertad - Trujillo, Perú',
    href: '#',
    isWhatsApp: false,
    isEmail: false,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const initAnimations = () => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current!.querySelectorAll('[data-reveal]'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          sectionRef.current!.querySelectorAll('.contact-card'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: sectionRef.current!.querySelector('.contact-cards'),
              start: 'top 80%',
            },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🧼 Limpieza: Enviamos el payload limpio respetando los tipos de TypeScript del servicio
      const response = await contactService.submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      }); 

      if (response.success) {
        setSent(true);

        toast.custom((t: any) => (
          <div
            className={`${t?.visible
                ? 'animate-in fade-in slide-in-from-top-4 duration-400'
                : 'animate-out fade-out slide-out-to-top-2 duration-300'
              } w-full max-w-[380px] bg-gradient-to-br from-[#02231c]/95 via-[#011410]/98 to-[#000806]/99 backdrop-blur-2xl border border-[#00ffc4]/25 rounded-2xl p-4 flex flex-col gap-3 pointer-events-auto select-none`}
            style={{
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 255, 196, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#000806] to-[#00ffc4]/20 flex items-center justify-center border border-[#00ffc4]/40">
                  <span className="font-space font-bold text-[9px] text-[#00ffc4] tracking-tighter">EXE</span>
                </div>
                <span className="font-inter font-bold text-[10px] uppercase tracking-[0.12em] text-white/60">
                  EXE STUDIO
                </span>
              </div>
              <span className="font-inter text-[10px] text-white/40 font-medium">ahora</span>
            </div>

            <div className="flex items-center gap-3.5 py-0.5">
              <div className="flex-shrink-0 w-8 h-8 bg-[#00ffc4]/10 rounded-xl text-[#00ffc4] flex items-center justify-center border border-[#00ffc4]/30 shadow-[0_0_15px_rgba(0,255,196,0.15)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-inter font-bold text-sm text-white leading-tight tracking-wide">
                  ¡Transmisión completada!
                </h4>
                <p className="font-inter font-normal text-xs text-slate-300 leading-snug mt-0.5">
                  Tu mensaje ha sido cifrado y enviado con éxito.
                </p>
              </div>
            </div>
          </div>
        ), {
          duration: 5000,
          position: 'top-right',
        });
        
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        toast.error(response.message || 'Fallo en la verificación del canal de comunicación.');
      }
    } catch (err) {
      toast.error('Error de red al establecer comunicación encriptada.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const baseInputStyles = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-inter text-sm focus:border-cyan-accent focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.1)] transition-all transform-gpu will-change-transform touch-manipulation relative z-10";

  return (
    <section ref={sectionRef} id="contacto" className="section-padding relative">
      <div className="container-main">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div data-reveal>
            <SectionLabel number="06" text="CONTACTO" />
          </div>
          <h2 data-reveal className="font-space font-bold text-4xl sm:text-5xl lg:text-[5vw] text-white leading-tight mb-4">
            Hablemos de tu Proyecto
          </h2>
          <p data-reveal className="font-inter font-light text-base lg:text-lg text-slate-text leading-relaxed">
            Estamos listos para construir algo extraordinario juntos. Cuéntanos sobre tu visión.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="contact-cards space-y-4">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              const isInteractive = info.isWhatsApp || info.isEmail;

              return (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.isWhatsApp ? '_blank' : undefined}
                  rel={info.isWhatsApp ? 'noopener noreferrer' : undefined}
                  className={`contact-card glass-card p-5 block transition-all duration-300 group border border-white/5 bg-white/[0.02] ${isInteractive
                    ? 'hover:bg-cyan-accent/[0.04] hover:border-cyan-accent/30'
                    : 'hover:bg-white/[0.06]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${isInteractive
                      ? 'bg-cyan-accent/10 text-cyan-accent group-hover:bg-cyan-accent group-hover:text-deep-space'
                      : 'text-cyan-accent'
                      }`}>
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-inter font-medium text-[10px] uppercase tracking-[0.15em] text-teal-accent mb-1">
                        {info.label}
                      </p>
                      <p className={`font-inter text-base text-white transition-colors duration-300 ${isInteractive ? 'group-hover:text-cyan-accent' : ''}`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Contact Form */}
          <div data-reveal className="relative z-10">
            {sent ? (
              <div className="gradient-border-card p-8 text-center h-full flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-cyan-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-space font-bold text-xl text-white mb-2">¡Mensaje enviado!</h3>
                <p className="font-inter text-sm text-slate-text">Te contactaremos pronto mediante nuestros oficiales de enlace.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs text-cyan-accent/60 hover:text-cyan-accent transition-colors underline font-mono relative z-20"
                >
                  [ ENVIAR OTRO MENSAJE ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="gradient-border-card p-6 lg:p-8 bg-white/[0.01] border border-white/5 rounded-2xl relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nombre *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={baseInputStyles}
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={baseInputStyles}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Empresa (opcional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={baseInputStyles}
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    placeholder="Mensaje *"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${baseInputStyles} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-inter font-medium text-sm uppercase tracking-[0.1em] bg-cyan-accent text-deep-space py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-deep-space" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Estableciendo Canal...
                    </>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
import { FaWhatsapp, FaFacebook, FaTiktok } from 'react-icons/fa6';
import { scrollToSection, scrollToTop } from '@/lib/scrollToSection';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

const SOCIAL_LINKS = [
  { 
    label: 'WhatsApp',
    href: 'https://wa.me/51942108694?text=Hola%20EXE%20Studio,%20vengo%20desde%20la%20web%20y%20me%20gustaría%20cotizar%20un%20proyecto.',
    icon: FaWhatsapp,
  },
  {
    label: 'Facebook',
    href: '#',
    icon: FaFacebook,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: FaTiktok,
  }
];

export function Footer() {
  return (
    // CORRECCIÓN: Se añade z-20 para aislar el nivel del DOM frente a las animaciones de scroll previas
    <footer className="bg-[#000508] border-t border-white/5 relative overflow-hidden z-20">
      {/* Sutil gradiente de profundidad de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-accent/[0.02] pointer-events-none" />

      <div className="container-main py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Identity */}
          <div className="space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block group transition-transform duration-300"
            >
              <img
                src="/assets/logo-exe.webp"
                alt="EXE Studio Logo"
                width={358}
                height={200}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="h-16 w-auto lg:h-20 object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(0,212,255,0.15)]"
              />
            </a>
            {/* CORRECCIÓN CONTRASTE: Subido de /70 a /90 para asegurar una lectura perfecta del tagline en smartphones */}
            <p className="font-inter font-light text-xs tracking-wide text-slate-text/90 leading-relaxed max-w-xs">
              Desarrollo tecnológico - Perú
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {/* CORRECCIÓN JERARQUÍA: Cambiado de text-slate-text/40 a text-cyan-accent/80 para dar un indicador de bloque moderno */}
            <p className="font-mono font-bold text-[11px] uppercase tracking-[0.2em] text-cyan-accent/80">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="font-inter text-sm text-white/80 hover:text-cyan-accent transition-colors duration-300 flex items-center gap-1 group"
                  >
                    <span className="w-0 h-[1px] bg-cyan-accent transition-all duration-300 group-hover:w-2 inline-block opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Network Hub */}
          <div className="space-y-4">
            {/* CORRECCIÓN JERARQUÍA: Unificado con el estilo de la columna de navegación */}
            <p className="font-mono font-bold text-[11px] uppercase tracking-[0.2em] text-cyan-accent/80">
              Síguenos
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    // CORRECCIÓN INTERACCIÓN: Caja de cristal optimizada y aumento de opacidad inicial del icono (text-white/60)
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-accent hover:border-cyan-accent/40 hover:bg-cyan-accent/[0.04] hover:-translate-y-1 transition-all duration-300 shadow-md"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Metadata */}
        {/* CORRECCIÓN CONTRASTE PIE DE PÁGINA: Elevadas las opacidades base (/40 -> /60 y /20 -> /40) para eliminar la invisibilidad */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-wider text-slate-text/70 uppercase">
            &copy; {new Date().getFullYear()} EXE STUDIO. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[9px] tracking-[0.15em] text-slate-text/40 uppercase hidden sm:block">
            Premium Digital Agency
          </p>
        </div>
      </div>
    </footer>
  );
}

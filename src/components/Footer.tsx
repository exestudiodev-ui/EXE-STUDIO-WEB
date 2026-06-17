import { scrollToSection, scrollToTop } from '@/lib/scrollToSection';

// Inline SVGs — replaces the entire react-icons dependency for just 3 icons
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

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
    icon: WhatsAppIcon,
  },
  {
    label: 'Facebook',
    href: '#',
    icon: FacebookIcon,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: TikTokIcon,
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

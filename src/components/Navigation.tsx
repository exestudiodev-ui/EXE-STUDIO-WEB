import { useState, useEffect } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { scrollToSection, scrollToTop } from '@/lib/scrollToSection';
import { useNavigationStore } from '@/store/navigationStore';
import { NAV_LINKS, MOBILE_MEDIA_QUERY } from '@/constants/navigation';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false
  );
  
  // Mantenemos esto solo si otros elementos del nav (que no vemos aquí) requieren abrir la cotización.
  // Si ningún elemento de la navegación abre la cotización, se puede eliminar esta línea.
  const setNavHidden = useNavigationStore((s) => s.setNavHidden);
  const setMobileViewport = useNavigationStore((s) => s.setMobileViewport);

  const { scrollY, isNavHidden } = useScrollDirection({ threshold: 50 });
  const scrolled = scrollY > 50;
  const hideNav = isMobileViewport && isNavHidden;

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const syncViewport = () => {
      const mobile = mediaQuery.matches;
      setIsMobileViewport(mobile);
      setMobileViewport(mobile);
      if (!mobile) {
        setNavHidden(false);
      }
    };

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, [setMobileViewport, setNavHidden]);

  useEffect(() => {
    setNavHidden(isNavHidden);
  }, [isNavHidden, setNavHidden]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  // Manejador específico para el botón de contacto
  const handleContactClick = () => {
    setMobileOpen(false);
    // Cambia '#contacto' por el ID exacto de la sección de tu landing page
    scrollToSection('#contacto'); 
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-transform duration-300 ease-out
          ${hideNav ? '-translate-y-full' : 'translate-y-0'}
          ${scrolled ? 'bg-[rgba(2,11,19,0.85)] backdrop-blur-xl' : 'bg-transparent'}
        `}
      >
        <div className="container-main flex items-center justify-between h-16 lg:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="font-space font-bold text-lg lg:text-xl text-cyan-accent tracking-tight"
          >
            <img
              src="/assets/logo-exe.webp"
              alt="EXE Studio Logo"
              width={358}
              height={200}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="h-16 w-auto lg:h-24 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-inter font-medium text-xs uppercase tracking-[0.15em] text-white/80 hover:text-cyan-accent transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Contact Button */}
          <button
            onClick={handleContactClick}
            className="hidden lg:block font-inter font-medium text-xs uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-6 py-2.5 rounded-full hover:bg-cyan-accent/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            Contáctanos
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(2,11,19,0.98)] backdrop-blur-3xl transition-all duration-400 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-space font-bold text-4xl text-white hover:text-cyan-accent transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          
          {/* Mobile Contact Button */}
          <button
            onClick={handleContactClick}
            className="mt-4 font-inter font-medium text-sm uppercase tracking-[0.1em] bg-cyan-accent text-deep-space px-8 py-3 rounded-full y-3 transition-colors duration-300 hover:bg-cyan-accent/90"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </>
  );
}
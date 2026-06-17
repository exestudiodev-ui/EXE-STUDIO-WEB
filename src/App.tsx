import { useEffect, useState, lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingNavigationButton } from '@/components/FloatingNavigationButton';
import { Toaster } from '@/components/ui/sonner';
import IntroVideo from '@/components/IntroVideo';
import { emitIntroReady } from '@/hooks/useIntroReady';
import {
  selectShowFloatingNav,
  useNavigationStore,
} from '@/store/navigationStore';
import { HeroSection } from '@/sections/HeroSection';

// Below-the-fold sections: loaded lazily so they don't block initial paint
const ServicesSection    = lazy(() => import('@/sections/ServicesSection').then(m => ({ default: m.ServicesSection })));
const TechnologiesSection = lazy(() => import('@/sections/TechnologiesSection').then(m => ({ default: m.TechnologiesSection })));
const ProcessSection     = lazy(() => import('@/sections/ProcessSection').then(m => ({ default: m.ProcessSection })));
const ProjectsSection    = lazy(() => import('@/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const QuoteEngineSection = lazy(() => import('@/sections/QuoteEngineSection').then(m => ({ default: m.QuoteEngineSection })));
const ContactSection     = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })));

// Modal: only needed when the user opens it
const QuoteModal = lazy(() => import('@/components/QuoteModal').then(m => ({ default: m.QuoteModal })));

// Invisible fallback — sections use content-visibility:auto so height is reserved
const SectionFallback = () => <div style={{ minHeight: '650px' }} aria-hidden="true" />;

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const showFloatingNav = useNavigationStore(selectShowFloatingNav);

  const handleIntroEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => {
        ScrollTrigger.refresh();
        emitIntroReady();
      }, 200);
    }, 600);
  };

  useEffect(() => {
    if (!showIntro) {
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [showIntro]);

  return (
    <div className="bg-deep-space min-h-screen text-white overflow-x-hidden relative">
      {showIntro && (
        <div
          className={`transition-opacity duration-400 ease-in-out z-[9999] relative ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <IntroVideo onVideoEnd={handleIntroEnd} />
        </div>
      )}

      {/* Fixed UI fuera del wrapper animado para que position:fixed funcione bien */}
      <Navigation />
      <FloatingNavigationButton isVisible={showFloatingNav} />

      <div
        className={`transition-[opacity,filter] duration-1000 ease-out ${
          showIntro
            ? 'opacity-0 blur-xl pointer-events-none max-h-screen overflow-hidden'
            : 'opacity-100 blur-0'
        }`}
      >
        <main>
          <HeroSection />
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <ServicesSection />
            </Suspense>
          </div>
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <TechnologiesSection />
            </Suspense>
          </div>
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <ProcessSection />
            </Suspense>
          </div>
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <ProjectsSection />
            </Suspense>
          </div>
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <QuoteEngineSection />
            </Suspense>
          </div>
          <div className="section-deferred">
            <Suspense fallback={<SectionFallback />}>
              <ContactSection />
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>

      <Suspense fallback={null}>
        <QuoteModal />
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;

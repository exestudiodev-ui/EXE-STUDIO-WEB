import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { QuoteModal } from '@/components/QuoteModal';
import { FloatingNavigationButton } from '@/components/FloatingNavigationButton';
import { Toaster } from '@/components/ui/sonner';
import IntroVideo from '@/components/IntroVideo';
import { emitIntroReady } from '@/hooks/useIntroReady';
import {
  selectShowFloatingNav,
  useNavigationStore,
} from '@/store/navigationStore';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { TechnologiesSection } from '@/sections/TechnologiesSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { QuoteEngineSection } from '@/sections/QuoteEngineSection';
import { ContactSection } from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

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
            <ServicesSection />
          </div>
          <div className="section-deferred">
            <TechnologiesSection />
          </div>
          <div className="section-deferred">
            <ProcessSection />
          </div>
          <div className="section-deferred">
            <ProjectsSection />
          </div>
          <div className="section-deferred">
            <QuoteEngineSection />
          </div>
          <div className="section-deferred">
            <ContactSection />
          </div>
        </main>

        <Footer />
      </div>

      <QuoteModal />
      <Toaster />
    </div>
  );
}

export default App;

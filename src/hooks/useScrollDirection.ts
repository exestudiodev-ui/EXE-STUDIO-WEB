import { useState, useEffect } from 'react';

interface UseScrollDirectionOptions {
  threshold?: number;
}

/**
 * Tracks scroll position and whether the navbar should stay hidden.
 * Hidden state persists while idle mid-page (only shows again on scroll up or near top).
 */
export function useScrollDirection({
  threshold = 50,
}: UseScrollDirectionOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    setScrollY(lastScrollY);

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY <= threshold) {
        setIsNavHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setIsNavHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsNavHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollY, isNavHidden, isNavVisible: !isNavHidden };
}

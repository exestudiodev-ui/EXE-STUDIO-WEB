import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  ease?: string;
  rotateX?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      scale = 1,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      start = 'top 80%',
      ease = 'power3.out',
      rotateX = 0,
    } = optionsRef.current;

    const children = ref.current.querySelectorAll('[data-reveal]');
    const targets = children.length > 0 ? children : ref.current;

    const ctx = gsap.context(() => {
      gsap.set(targets, { y, x, opacity, scale, rotateX });
      gsap.to(targets, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

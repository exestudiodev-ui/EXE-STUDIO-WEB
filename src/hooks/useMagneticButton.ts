import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagneticButton(strength: number = 0.4) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height) * 1.5;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * strength;
        gsap.to(button, {
          x: deltaX * force,
          y: deltaY * force,
          duration: 0.3,
          ease: 'power2.out',
        });
        if (text) {
          gsap.to(text, {
            x: deltaX * force * 0.5,
            y: deltaY * force * 0.5,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      if (text) {
        gsap.to(text, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    };

    const parent = button.parentElement || document;
    const onMove = handleMouseMove as EventListener;
    const onLeave = handleMouseLeave as EventListener;
    parent.addEventListener('mousemove', onMove);
    button.addEventListener('mouseleave', onLeave);

    return () => {
      parent.removeEventListener('mousemove', onMove);
      button.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return { buttonRef, textRef };
}

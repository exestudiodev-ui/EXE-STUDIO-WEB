import { useQuoteStore } from '@/store/quoteStore';

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToSection(href: string) {
  if (href === '#cotizar') {
    useQuoteStore.getState().setModalOpen(true);
    return;
  }

  if (href === '#' || href === '') {
    scrollToTop();
    return;
  }

  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

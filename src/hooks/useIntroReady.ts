/**
 * useIntroReady hook
 * Emite un evento global 'intro-ready' cuando la intro termina.
 * Los componentes que dependen de ScrollTrigger escuchan este evento
 * para inicializar sus animaciones después de que el DOM sea visible.
 */

export const INTRO_READY_EVENT = 'intro-ready';

export function emitIntroReady() {
  window.dispatchEvent(new CustomEvent(INTRO_READY_EVENT));
}

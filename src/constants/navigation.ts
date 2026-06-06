export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Procesos', href: '#proceso' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Cotizar', href: '#cotizar' },
  //{ label: 'Contacto', href: '#contacto' }
] as const;

export const FLOATING_MENU_ITEMS = [
  { label: 'Contacto', href: '#contacto' },
] as const;

export const MOBILE_MEDIA_QUERY = '(max-width: 1023px)';

export type NavLink = (typeof NAV_LINKS)[number];

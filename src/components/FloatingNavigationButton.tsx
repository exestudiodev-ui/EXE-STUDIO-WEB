import { Home, Menu } from 'lucide-react';
import { scrollToSection, scrollToTop } from '@/lib/scrollToSection';
import { NAV_LINKS, FLOATING_MENU_ITEMS } from '@/constants/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FloatingNavigationButtonProps {
  isVisible: boolean;
}

export function FloatingNavigationButton({
  isVisible,
}: FloatingNavigationButtonProps) {
  const menuItems = [...NAV_LINKS, ...FLOATING_MENU_ITEMS];

  if (!isVisible) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 z-50 lg:hidden
        flex items-center gap-3 -translate-x-1/2
        animate-in fade-in slide-in-from-bottom-4 duration-300
      "
      role="navigation"
      aria-label="Navegación rápida"
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="
          w-14 h-14
          bg-cyan-accent text-deep-space
          rounded-full
          flex items-center justify-center
          shadow-[0_0_30px_rgba(0,212,255,0.4)]
          hover:shadow-[0_0_40px_rgba(0,212,255,0.6)]
          active:scale-95
          transition-all duration-300
        "
        aria-label="Volver al inicio"
      >
        <Home className="w-6 h-6" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="
              w-14 h-14
              glass-card
              border border-cyan-accent/20
              bg-[rgba(2,11,19,0.95)]
              backdrop-blur-3xl
              text-white
              rounded-full
              flex items-center justify-center
              shadow-[0_0_30px_rgba(0,212,255,0.2)]
              hover:text-cyan-accent hover:border-cyan-accent/40
              active:scale-95
              transition-all duration-300
            "
            aria-label="Ir a una sección"
          >
            <Menu className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          side="top"
          sideOffset={12}
          className="
            glass-card
            border border-cyan-accent/20
            bg-[rgba(2,11,19,0.95)]
            backdrop-blur-3xl
            p-2
            min-w-[200px]
            shadow-[0_0_30px_rgba(0,212,255,0.2)]
          "
        >
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-white hover:text-cyan-accent hover:bg-white/10 cursor-pointer py-3"
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

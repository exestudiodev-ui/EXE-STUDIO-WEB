import { cn } from '@/lib/utils';
import type { Currency } from '@/lib/currency';

interface CurrencyToggleProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencyToggle({
  currency,
  onChange,
  className,
}: CurrencyToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg border border-white/10 p-0.5 bg-white/5',
        className
      )}
      role="group"
      aria-label="Moneda"
    >
      <button
        type="button"
        onClick={() => onChange('USD')}
        className={cn(
          'px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-md transition-all',
          currency === 'USD'
            ? 'bg-cyan-accent text-deep-space'
            : 'text-white/60 hover:text-white'
        )}
      >
        USD
      </button>
      <button
        type="button"
        onClick={() => onChange('PEN')}
        className={cn(
          'px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-md transition-all',
          currency === 'PEN'
            ? 'bg-cyan-accent text-deep-space'
            : 'text-white/60 hover:text-white'
        )}
      >
        PEN
      </button>
    </div>
  );
}

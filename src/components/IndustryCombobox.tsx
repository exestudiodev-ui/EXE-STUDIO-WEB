import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { INDUSTRIES } from '@/constants/industries';

interface IndustryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  id?: string;
}

export function IndustryCombobox({
  value,
  onChange,
  error,
  id = 'industry',
}: IndustryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const displayValue = value || 'Selecciona o escribe tu rubro...';

  const handleSelect = (selected: string) => {
    onChange(selected);
    setOpen(false);
    setSearch('');
  };

  const handleUseCustom = () => {
    const trimmed = search.trim();
    if (trimmed.length >= 2) {
      onChange(trimmed);
      setOpen(false);
      setSearch('');
    }
  };

  const filtered = INDUSTRIES.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const showCustomOption =
    search.trim().length >= 2 &&
    !INDUSTRIES.some(
      (i) => i.toLowerCase() === search.trim().toLowerCase()
    );

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between h-auto min-h-[46px] px-4 py-3',
              'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white',
              'font-inter text-sm font-normal',
              !value && 'text-white/30',
              error && 'border-red-500/50'
            )}
          >
            <span className="truncate text-left">{displayValue}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-[rgba(2,11,19,0.98)] border-white/10"
          align="start"
        >
          <Command className="bg-transparent" shouldFilter={false}>
            <CommandInput
              placeholder="Buscar o escribir rubro..."
              value={search}
              onValueChange={setSearch}
              className="text-white placeholder:text-white/40"
            />
            <CommandList>
              <CommandEmpty className="text-slate-text py-4 text-sm">
                {search.trim().length < 2
                  ? 'Escribe al menos 2 caracteres para usar un rubro personalizado'
                  : 'No hay coincidencias'}
              </CommandEmpty>
              {filtered.length > 0 && (
                <CommandGroup heading="Sectores" className="text-slate-text">
                  {filtered.map((industry) => (
                    <CommandItem
                      key={industry}
                      value={industry}
                      onSelect={() => handleSelect(industry)}
                      className="text-white cursor-pointer aria-selected:bg-white/10"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-cyan-accent',
                          value === industry ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {industry}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {showCustomOption && (
                <CommandGroup heading="Personalizado">
                  <CommandItem
                    value={`custom-${search}`}
                    onSelect={handleUseCustom}
                    className="text-cyan-accent cursor-pointer aria-selected:bg-white/10"
                  >
                    Usar &quot;{search.trim()}&quot;
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

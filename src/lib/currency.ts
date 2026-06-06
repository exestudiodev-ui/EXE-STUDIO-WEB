export type Currency = 'USD' | 'PEN';

/** Tasa referencial PEN por USD (mercado peruano, actualizable) */
export const EXCHANGE_RATE = 3.75;

export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amount;
  if (from === 'USD' && to === 'PEN') return Math.round(amount * EXCHANGE_RATE);
  return Math.round(amount / EXCHANGE_RATE);
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === 'PEN') {
    return `S/ ${amount.toLocaleString('es-PE', { maximumFractionDigits: 0 })}`;
  }
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function formatMoneyWithCode(amountUsd: number, currency: Currency): string {
  const value =
    currency === 'PEN' ? convertCurrency(amountUsd, 'USD', 'PEN') : amountUsd;
  const formatted = formatMoney(value, currency);
  return currency === 'PEN' ? `${formatted} PEN` : `${formatted} USD`;
}

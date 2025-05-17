import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number, currencySelected: string) =>
  new Intl.NumberFormat(verifyLocale(currencySelected.toUpperCase()), {
    style: "currency",
    currency: currencySelected.toUpperCase(),
  }).format(value);

const verifyLocale = (value: string) => {
  switch (value) {
    case "USD":
      return "en-US";
    case "EUR":
      return "de-DE";
    case "BRL":
      return "pt-BR";
    default:
      return "en-US";
  }
};

export const manualFormarNumber = (currency: string, value: number) => {
  switch (currency?.toUpperCase()) {
    case "USD":
      return `$${value}`;
    case "EUR":
      return `${value}€`;
    case "BRL":
      return `R$${value}`;
    default:
      return `$${value}`;
  }
};

export function formatCurrencyShort(value: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatted = formatter.format(value);

  return formatted.replace(/^(\D+)/, "$1 ");
}

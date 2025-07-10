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

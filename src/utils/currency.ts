export const formatNumber = (
  value: number,
  currencySelected: string,
  compact = false
) =>
  new Intl.NumberFormat(verifyLocale(currencySelected.toUpperCase()), {
    style: 'currency',
    currency: currencySelected.toUpperCase(),
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 2,
  }).format(value)

export const verifyLocale = (value: string) => {
  switch (value) {
    case 'USD':
      return 'en-US'
    case 'EUR':
      return 'de-DE'
    case 'BRL':
      return 'pt-BR'
    default:
      return 'en-US'
  }
}

export const manualFormarNumber = (currency: string, value: number) => {
  switch (currency?.toUpperCase()) {
    case 'USD':
      return `$${value}`
    case 'EUR':
      return `${value}€`
    case 'BRL':
      return `R$${value}`
    default:
      return `$${value}`
  }
}

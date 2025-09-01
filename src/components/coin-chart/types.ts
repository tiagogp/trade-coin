export type ChartPoint = { date: number; coin: number }

export interface CoinChartProps {
  title?: string
  chartData: ChartPoint[]
  currency?: string
  locale?: string
  nameCoin: string
}

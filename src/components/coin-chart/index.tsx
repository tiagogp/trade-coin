'use client'

import { CHART_CONFIG } from './constants'
import type { CoinChartProps } from './types'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'
import { formatNumber, verifyLocale } from '@/utils/currency'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

// Helpers
export const formatBRL = (value: number, locale = 'pt-BR', currency = 'BRL') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)

export const formatMonthTick = (m: number, currencySelected: string) => {
  return new Intl.DateTimeFormat(verifyLocale(currencySelected), {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(m))
}

// Component
export default function CoinChart({
  title = '',
  chartData,
  currency = 'usd',
  locale = 'pt-BR',
  nameCoin,
}: CoinChartProps) {
  const hasData = Array.isArray(chartData) && chartData.length > 0

  return (
    <ChartContainer
      config={CHART_CONFIG}
      className='h-[300px] w-full max-w-3xl '
    >
      <CardHeader className='pb-0'>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='p-4 sm:p-6'>
        {!hasData ? (
          <div className='flex h-52 items-center justify-center text-sm text-zinc-500'>
            Sem dados para exibir.
          </div>
        ) : (
          <div className='h-72 w-full'>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='coinGrad' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor={CHART_CONFIG.coin.color}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset='95%'
                      stopColor={CHART_CONFIG.coin.color}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray='3 3'
                  className='stroke-zinc-700'
                />
                <XAxis
                  dataKey='date'
                  tickFormatter={e => formatMonthTick(e, currency)}
                  tick={{ className: 'text-xs fill-zinc-800' } as any}
                  axisLine={{ className: 'stroke-zinc-400' } as any}
                />
                <YAxis
                  tickFormatter={e => formatNumber(e, currency, true)}
                  tick={{ className: 'text-xs fill-zinc-800' } as any}
                  width={80}
                  axisLine={{ className: 'stroke-zinc-400' } as any}
                />

                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator='dot'
                      labelFormatter={(_, value) => (
                        <div className='flex flex-col'>
                          <div className='flex items-center gap-1'>
                            <div
                              className={cn(
                                `w-2.5 h-2.5 rounded-xs`,
                                `bg-[var(--chart-1)]`
                              )}
                            />
                            <p className='font-semibold'>{nameCoin}</p>{' '}
                          </div>
                          <p>
                            {formatNumber(
                              Number(value[0]?.payload?.coin),
                              currency
                            )}
                          </p>
                          <p>
                            {formatMonthTick(
                              Number(value[0].payload.date),
                              currency
                            )}
                          </p>
                        </div>
                      )}
                      formatter={() => ''}
                      className='bg-zinc-800 border-zinc-700'
                    />
                  }
                />

                <Area
                  type='monotone'
                  dataKey='coin'
                  name='coin'
                  strokeWidth={2}
                  fill='url(#coinGrad)'
                  stroke='var(--chart-1)'
                  className='text-chart-1'
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </ChartContainer>
  )
}

import { CoinInfosDetails } from '@/components/CoinInfosDetails'
import CoinChart from '@/components/coin-chart'
import type { ChartPoint } from '@/components/coin-chart/types'
import type { IMarket, IMarketChart } from 'interfaces/IMarket'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Percentage from 'src/components/Percentage'
import { buildUrlWithParams } from 'src/services/api'
import { formatNumber } from 'src/utils/currency'

interface Params {
  params: {
    id?: string
    currency: string
  }
}

export const revalidate = 3600

export default async function CoinById({ params }: Params) {
  const currencyValue = params.currency || 'usd'

  if (params.id) {
    const url = buildUrlWithParams('/api/v3/coins/markets', {
      vs_currency: currencyValue,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
      ids: params.id,
    })

    const res = await fetch(url.toString(), {
      next: { revalidate },
    })

    const data = (await res.json()) as IMarket[]

    const item = data.find(item => item.id === params.id)

    const urlChart = buildUrlWithParams(
      `/api/v3/coins/${params.id}/market_chart`,
      {
        vs_currency: currencyValue,
        days: 1,
      }
    )

    const ress = await fetch(urlChart.toString(), {
      next: { revalidate },
    })

    const dataChart = (await ress.json()) as IMarketChart

    const formattedChart = dataChart.prices.map(newItem => ({
      date: newItem[0],
      coin: newItem[1],
    })) as ChartPoint[]

    if (item) {
      const {
        name,
        image,
        current_price,
        symbol,
        price_change_percentage_24h,
      } = item

      return (
        <div className='flex flex-col gap-4 px-12 py-8 break-all'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Image width={64} height={64} src={image} alt={name} />
              <div className='flex flex-col'>
                <p className='text-white text-2xl font-semibold'>{name}</p>
                <p className='text-zinc-600 font-semibold'>
                  {symbol.toUpperCase()}
                </p>
              </div>
            </div>
            <div className='flex flex-col border border-zinc-700 rounded p-0'>
              <div className='px-4 py-2'>
                <p className='text-white text-2xl font-semibold'>
                  {formatNumber(current_price, currencyValue)}
                </p>
              </div>
              <div className='bg-zinc-800 rounded-sm py-0.5'>
                <Percentage value={price_change_percentage_24h} />
              </div>
            </div>
          </div>
          <main className='flex '>
            <CoinChart
              chartData={formattedChart}
              currency={currencyValue}
              title={`${item.name} to ${currencyValue.toUpperCase()} in Chart`}
              nameCoin={item.name}
            />

            <CoinInfosDetails infos={item} />
          </main>
        </div>
      )
    }
  }

  return notFound()
}

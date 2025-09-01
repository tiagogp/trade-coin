import type { IMarket } from 'interfaces/IMarket'
import Cookies from 'js-cookie'
import { notFound } from 'next/navigation'
import { buildUrlWithParams } from 'src/services/api'

interface Params {
  params: {
    id?: string
  }
}

export const revalidate = 3600

export default async function CoinById({ params }: Params) {
  const currency = Cookies.get('currency') || 'usd'

  const url = buildUrlWithParams('/api/v3/coins/markets', {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    sparkline: true,
  })

  const res = await fetch(url.toString(), {
    next: { revalidate },
  })

  const data = (await res.json()) as IMarket[]

  const item = data.find(item => item.id === params.id)

  if (params.id && item) {
    return <div>{JSON.stringify(item)}</div>
  }

  return notFound()
}

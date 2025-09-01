import type { IParams } from '../layout'
import type { IMarket } from 'interfaces/IMarket'
import CoinItem from 'src/components/coin-item'
import { buildUrlWithParams } from 'src/services/api'

export const revalidate = 3600

export default async function Home({ params }: IParams) {
  const currency = params.currency || 'usd'

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

  return data?.map((coin, index) => (
    <CoinItem key={coin.id} coin={coin} index={index + 1} />
  ))
}

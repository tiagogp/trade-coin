'use client'

import { formatNumber } from '../utils/currency'
import { CoinInfosProps } from './CoinInfos'
import Percentage from './Percentage'
import { FC, useEffect, type PropsWithChildren } from 'react'
import { useCurrency } from 'src/hooks/Currency'

interface ItemCoinDetailsProps extends PropsWithChildren {
  title: string
}

export const CoinInfosDetails: FC<CoinInfosProps> = ({ infos }) => {
  const { atualCurrency } = useCurrency()

  useEffect(() => {}, [atualCurrency])

  return (
    <div className='flex flex-col flex-1 max-w-sm text-zinc-100  gap-2 bg-zinc-800/50 border border-zinc-700 rounded backdrop-blur-2xl transition-all duration-200 ease-in-out'>
      <h1 className='font-bold text-xl  py-4 px-4 border-b border-zinc-700'>
        {infos.symbol.toLocaleUpperCase()} Price Statistics
      </h1>

      <ItemCoinDetails title='Market Rank'>
        {infos.market_cap_rank ? `#${infos.market_cap_rank}` : 'Unranked'}
      </ItemCoinDetails>

      <ItemCoinDetails title={`${infos.name} Price`}>
        {formatNumber(infos.current_price, atualCurrency, true)}
      </ItemCoinDetails>

      <ItemCoinDetails title='Price change 24H'>
        {formatNumber(infos.price_change_24h, atualCurrency, true)}
        <Percentage value={infos.price_change_percentage_24h} />
      </ItemCoinDetails>

      <ItemCoinDetails title='24h Low / 24h High'>
        {formatNumber(infos.low_24h, atualCurrency, true)}/
        {formatNumber(infos.high_24h, atualCurrency, true)}
      </ItemCoinDetails>

      <ItemCoinDetails title='Market Cap'>
        {formatNumber(infos.market_cap_change_24h, atualCurrency, true)}
        <Percentage value={infos.market_cap_change_percentage_24h} />
      </ItemCoinDetails>

      <ItemCoinDetails title='Fully Diluted Market Cap'>
        {formatNumber(infos?.fully_diluted_valuation || 0, atualCurrency, true)}
      </ItemCoinDetails>
    </div>
  )
}

const ItemCoinDetails: FC<ItemCoinDetailsProps> = ({ title, children }) => (
  <div className='flex text-sm font-semibold border-b py-2 px-4 text-zinc-100 w-full items-center justify-between border-zinc-700 last-of-type:border-0'>
    <p className='max-w-[200px]'>{title}</p>
    <div className='flex flex-col items-end'>{children}</div>
  </div>
)

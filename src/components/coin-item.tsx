'use client'

import Percentage from './Percentage'
import type { IMarket } from 'interfaces/IMarket'
import React from 'react'
import { useCurrency } from 'src/hooks/Currency'
import { formatNumber } from 'src/utils/currency'

interface CoinRowProps {
  coin: IMarket
  index: number
}

const CoinItem: React.FC<CoinRowProps> = ({ coin, index }) => {
  const { atualCurrency } = useCurrency()

  if (!coin) return null

  return (
    <a
      href={`/${atualCurrency}/coin/${coin.id}`}
      className='flex gap-3 items-center border-t border-zinc-800 py-2 px-4 even:bg-zinc-700/10 first-of-type:border-t-0'
    >
      <div className='flex items-center flex-1'>
        <div className='flex flex-1 gap-3 items-center'>
          <div className='font-bold'>{index}</div>
          <img
            src={coin.image}
            alt={coin.name}
            className='rounded-full w-[28px] h-[28px]'
            loading='lazy'
          />
          <b className='hidden sm:block'>{coin.name}</b>
          <div className='font-semibold text-gray-400'>
            {coin.symbol?.toUpperCase()}
          </div>
        </div>

        <div className='flex flex-1 justify-end items-center gap-2'>
          {formatNumber(Number(coin.current_price), atualCurrency)}
          <Percentage value={Number(coin.price_change_percentage_24h)} />
        </div>
        <div className='hidden md:block  flex-1 text-right'>
          {formatNumber(Number(coin.market_cap), atualCurrency)}
        </div>
        <div className='hidden md:block  flex-1 text-right'>
          {formatNumber(Number(coin.total_volume), atualCurrency)}
        </div>
        <div className='hidden lg:block flex-1 text-right'>
          {formatNumber(Number(coin.total_volume), atualCurrency)}
        </div>
      </div>
    </a>
  )
}

export default CoinItem

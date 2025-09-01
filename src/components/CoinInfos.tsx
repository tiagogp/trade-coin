import { IMarket } from '../../interfaces/IMarket'
import { useCurrency } from '../hooks/Currency'
import { formatNumber, manualFormarNumber } from '../utils/currency'
import Image from 'next/image'
import { FC } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

export interface CoinInfosProps {
  infos: IMarket
}

const CoinInfos: FC<CoinInfosProps> = ({ infos }) => {
  const { atualCurrency } = useCurrency()

  return (
    <div className='flex  items-stretch  gap-2 justify-between pb-4 '>
      <div className='flex items-center gap-3 '>
        <Image src={infos?.image} alt={infos?.name} width={64} height={64} />
        <div>
          <h1 className='font-bold text-2xl text-slate-800 dark:text-slate-200'>
            {infos?.name}
          </h1>
          <p className='font-semibold  text-xs  rounded-lg  text-slate-500'>
            {infos?.symbol.toLocaleUpperCase()}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <h1 className='font-bold text-xl md:text-2xl text-slate-800 dark:text-slate-200'>
          {infos?.current_price > 1
            ? formatNumber(infos?.current_price, atualCurrency)
            : manualFormarNumber(atualCurrency, infos?.current_price)}
        </h1>
        <h2
          className={`flex ${
            infos?.price_change_percentage_24h > 0
              ? 'bg-green-500'
              : 'bg-red-500'
          } font-semibold text-white dark:text-[#202230] text-xs rounded-lg py-1 px-2 items-center  gap-x-0.5`}
        >
          {infos?.price_change_percentage_24h > 0 ? (
            <AiFillCaretUp />
          ) : (
            <AiFillCaretDown />
          )}
          {infos?.price_change_percentage_24h
            ?.toPrecision(2)
            .toString()
            .replace('-', '') ?? 0.0}
          %
        </h2>
      </div>
    </div>
  )
}

export default CoinInfos

export const CoinInfosSkeleton: FC = () => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-3'>
      <div className='h-14 w-14 bg-slate-200 dark:bg-[#383b56] rounded-full'></div>
      <div className='flex flex-col gap-2'>
        <div className='h-6  w-28 bg-slate-200 dark:bg-[#383b56] rounded-full'></div>
        <div className='h-4 w-16 bg-slate-200 dark:bg-[#383b56] rounded-full'></div>
      </div>
    </div>

    <div className='flex flex-col items-end gap-3'>
      <div className='h-6 w-24 sm:w-32 bg-slate-200 dark:bg-[#383b56] rounded-full'></div>
      <div className='h-4 w-12 sm:w-16 bg-slate-200 dark:bg-[#383b56] rounded-full'></div>
    </div>
  </div>
)

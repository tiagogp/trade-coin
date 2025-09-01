import logo from '../../public/logo-light.svg'
import { cn } from '../lib/utils'
import CurrencyItem from './CurrencyItem'
import Image from 'next/image'

export const Header = () => (
  <div
    className={cn(
      'sticky top-0 rounded-t-md bg-zinc-900 flex flex-col items-center justify-between border-zinc-800 border-b gap-1 shadow-2xl'
    )}
  >
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full px-4 py-3'
      )}
    >
      <a href='/'>
        <Image
          src={logo.src}
          alt='Logo'
          className='w-16'
          width={logo.width}
          height={logo.height}
        />
      </a>
      <div className='flex gap-2 w-full max-w-md'>
        <input
          placeholder='search'
          className='border-zinc-800 bg-zinc-800 border px-2 py-1 rounded-md outline-0 ring-yellow-500/80 focus:ring-1  max-w-md flex-1'
        />

        <CurrencyItem />
      </div>
    </div>

    <div className=' items-center w-full border-zinc-800 border-t py-2 px-4 hidden sm:flex'>
      <div className='flex flex-1'>
        <p className='font-semibold text-gray-400'>Name</p>
      </div>

      <div className='flex-1 text-center'>
        <p className='font-semibold text-gray-400'>Price</p>
      </div>
      <div className='hidden md:block flex-1 text-right'>
        <p className='font-semibold text-gray-400'>Market cap</p>
      </div>
      <div className='hidden md:block flex-1 text-right'>
        <p className='font-semibold text-gray-400'>Supply</p>
      </div>
      <div className='hidden lg:block flex-1 text-right'>
        <p className='font-semibold  text-gray-400'>Volume (24Hr)</p>
      </div>
    </div>
  </div>
)

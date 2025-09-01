import type { UseSearch } from './types'
import Link from 'next/link'
import { FC } from 'react'
import { CgCloseO } from 'react-icons/cg'
import { HiOutlineSearch } from 'react-icons/hi'
import { cn } from 'src/lib/utils'

export const SearchView: FC<UseSearch> = ({
  text,
  setText,
  closeModal,
  correctSearch,
  filtered,
  focused,
  setFocused,
  date,
}) => {
  return (
    <div className='relative max-w-full'>
      <div
        className={`flex flex-row items-center border z-30 border-transparent bg-zinc-800 focus-within:border-amber-500/30 focus-within:bg-zinc-800 rounded-md py-2 sm:py-1 gap-2 px-2 static text-zinc-400 focus-within:text-amber-500 transition-all duration-200`}
      >
        <HiOutlineSearch className='transition-all duration-200' size={18} />
        <input
          className='bg-transparent peer transition-all duration-200 ease-in-out text-sm z-10 py-1 placeholder:font-medium font-medium  focus:text-zinc-200'
          type='text'
          value={text}
          placeholder='Search'
          onFocus={() => setFocused(true)}
          onBlur={closeModal}
          onChange={e => correctSearch(e.target.value.trim(), date)}
        />
        <CgCloseO
          className={`${
            text.length > 0 ? 'translate-x-0 ' : 'opacity-0 translate-x-5'
          } cursor-pointer transition-all duration-200 ease-in-out`}
          size={18}
          onClick={() => text.length > 0 && setText('')}
        />
      </div>
      {focused && text.length > 0 && (
        <div className='absolute  text-xs z-[1] bg-zinc-800 border border-zinc-700 rounded-md top-11 w-full shadow-2xl overflow-hidden'>
          {filtered?.slice(0, 10).map(item => (
            <Link
              href={`/coin/${item.id}`}
              className={cn(
                'flex cursor-pointer font-semibold justify-between',
                'gap-1 py-2 px-3 w-full transition-all duration-200 ease-in-out text-zinc-200 items-center hover:bg-zinc-600/50'
              )}
              key={item.id + item.name}
            >
              <p>{item.name}</p>
              <p className='py-1 px-2 bg-slate-100 dark:bg-amber-600 rounded'>
                {item.symbol?.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

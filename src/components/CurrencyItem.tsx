'use client'

import { useCurrency } from '../hooks/Currency'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { SUPPORTED_CURRENCIES } from 'src/lib/constants'

const CurrencyItem = () => {
  const { atualCurrency, setAtualCurrency } = useCurrency()
  const [isVisible, setIsVisible] = useState(false)

  const closeModal = () => {
    const button = setTimeout(() => {
      setIsVisible(false)
    }, 200)

    return () => clearTimeout(button)
  }

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsVisible(true)}
        onBlur={() => closeModal()}
        className='relative w-full flex gap-3 bg-zinc-800 border duration-150 border-zinc-600 rounded-md shadow-sm  cursor-pointer ease-out py-1.5 px-3 text-left focus:border-amber-500/30 sm:text-sm'
      >
        <span className='flex items-center gap-2'>
          <Image
            src={`/${atualCurrency?.toUpperCase()}.png`}
            alt='currency'
            width={24}
            height={24}
          />
          <span className=''>{atualCurrency?.toUpperCase()}</span>
        </span>
        <span className=' flex flex-col items-center pointer-events-none text-gray-400 justify-center'>
          <FaChevronUp size={10} />
          <FaChevronDown size={10} />
        </span>
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className='absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            role='listbox'
            aria-labelledby='listbox-label'
            aria-activedescendant='listbox-option-3'
          >
            {SUPPORTED_CURRENCIES.map(item => (
              <li
                key={item}
                className={`${
                  atualCurrency === item && 'bg-slate-300 dark:bg-blue-600/20'
                } text-gray-900 dark:text-slate-100 cursor-pointer hover:bg-slate-200 dark:hover:bg-blue-500/40 duration-75 select-none flex items-center relative py-2 pl-3 pr-9`}
                id='listbox-option-0'
                role='option'
                onClick={() => setAtualCurrency(item)}
              >
                <Image
                  src={`/${item?.toUpperCase()}.png`}
                  alt={item}
                  width={24}
                  height={24}
                />
                <span className='font-normal ml-3 block'>
                  {item?.toUpperCase()}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CurrencyItem

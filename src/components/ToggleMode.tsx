'use client'

import { useTheme } from 'next-themes'
import { FC } from 'react'
import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs'

const ToggleMode: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className='text-gray-400 dark:text-slate-300  px-3 rounded-lg border-[1.5px] border-slate-300 '
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <BsSun /> : <BsFillMoonStarsFill />}
    </button>
  )
}

export default ToggleMode

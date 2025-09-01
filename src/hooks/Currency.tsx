'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface ICurrencyContext {
  atualCurrency: string
  setAtualCurrency(value: string): void
  isClient: boolean
}

const CurrencyContext = createContext<ICurrencyContext | null>(null)

export const CurrencyProvider: FC = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  const pathname = usePathname()
  const segments = useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname]
  )
  const { push } = useRouter()

  const [atualCurrency, setAtualCurrency] = useState(segments[0] || 'usd')

  const SetValue = (value: string) => {
    const newURL = segments.map((item, index) => {
      if (index === 0) return value

      return item
    })

    push(`/${newURL.join('/')}`)
    setAtualCurrency(value)
  }

  useEffect(() => {
    if (segments?.[0] && segments?.[0] !== atualCurrency) {
      setAtualCurrency(segments?.[0])
    }
  }, [segments])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <CurrencyContext.Provider
      value={{ atualCurrency, setAtualCurrency: SetValue, isClient }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = (): ICurrencyContext => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used with CurrencyProvider')
  }

  return context
}

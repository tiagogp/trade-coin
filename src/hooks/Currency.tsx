'use client'

import Cookies from 'js-cookie'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { createContext, FC, useContext, useEffect, useState } from 'react'

interface ICurrencyContext {
  atualCurrency: string
  setAtualCurrency(value: string): void
}

const CurrencyContext = createContext<ICurrencyContext | null>(null)

export const CurrencyProvider: FC = ({ children }) => {
  const [atualCurrency, setAtualCurrency] = useState('usd')
  const router = useRouter()
  const searchParams = useSearchParams()

  const SetValue = (value: string) => {
    Cookies.set('currency-cookie', value)
    const params = new URLSearchParams(searchParams.toString())
    params.set('currency', value)
    router.push(`?${params.toString()}`, { scroll: false })
    setAtualCurrency(value)
  }

  useEffect(() => {
    const currency = Cookies.get('currency-cookie')

    if (currency) {
      setAtualCurrency(currency)
      return
    }

    Cookies.set('currency-cookie', 'usd')
  }, [])

  return (
    <CurrencyContext.Provider
      value={{ atualCurrency, setAtualCurrency: SetValue }}
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

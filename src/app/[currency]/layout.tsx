import type { IParams } from '../layout'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { SUPPORTED_CURRENCIES } from 'src/lib/constants'

interface RootLayoutProps extends IParams {
  children: ReactNode
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const currency = params?.currency || 'usd'

  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    notFound()
  }

  return <>{children}</>
}

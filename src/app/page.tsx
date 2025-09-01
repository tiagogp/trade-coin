'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default async function Home() {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/usd')
  }, [])

  return null
}

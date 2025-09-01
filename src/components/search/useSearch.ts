import type { SearchDates, SearchProps } from './types'
import { useEffect, useState } from 'react'
import { getAllCoins } from 'src/services/getAllCoins'

export const useSearch = ({ text, setText }: SearchProps) => {
  const [focused, setFocused] = useState(false)
  const [date, setDate] = useState<SearchDates[]>([])
  const [filterDate, setFilterDate] = useState<SearchDates[]>([])

  const filtered = filterDate || date

  const closeModal = () => {
    const button = setTimeout(() => {
      setFocused(false)
    }, 500)

    return () => clearTimeout(button)
  }

  const correctSearch = (text: string, date: SearchDates[]) => {
    setText(text)
    const filterResult = date.filter(
      item =>
        item.name.toLowerCase().startsWith(text.toLowerCase()) ||
        item.symbol.startsWith(text.toLowerCase())
    )
    setFilterDate(filterResult)
  }

  useEffect(() => {
    ;(async () => {
      const idsCoins = localStorage.getItem('idsCoins')
      const dateCoins = localStorage.getItem('dateCoins')

      if (idsCoins && dateCoins) {
        const atualCoins = JSON.parse(idsCoins)
        const dateAtualCoins = new Date(JSON.parse(dateCoins))

        const isValid = Date.now() - dateAtualCoins.getTime() <= 86_400_000

        if (atualCoins && isValid) {
          setDate(atualCoins)
          return
        }
      }

      const payload = await getAllCoins()
      setDate(payload)

      localStorage.setItem('idsCoins', JSON.stringify(payload))
      localStorage.setItem('dateCoins', JSON.stringify(new Date()))
    })()
  }, [])

  return {
    focused,
    setFocused,
    filtered,
    closeModal,
    setText,
    correctSearch,
    text,
    date,
  }
}

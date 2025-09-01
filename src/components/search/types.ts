import { useSearch } from './useSearch'

export interface SearchProps {
  text: string
  setText: (newText: string) => void
}

export interface SearchDates {
  id: string
  symbol: string
  name: string
}

export type UseSearch = ReturnType<typeof useSearch>

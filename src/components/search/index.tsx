import { SearchView } from './search'
import type { SearchProps } from './types'
import { useSearch } from './useSearch'
import type { FC } from 'react'

export const Search: FC<SearchProps> = ({ setText, text }) => {
  const model = useSearch({ setText, text })

  return <SearchView {...model} />
}




export interface ICoinResponse {
  timestamp: number
  data: ICoinProps[]
}

export interface ICoinProps {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
  tokens: Tokens
}

export interface Tokens {
  "1": string[]
  "10": string[]
  "137": string[]
  "42161": string[]
}

import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
})

type FetchOptions = {
  params?: Record<string, string | number | boolean>
  revalidate?: number
}

export function buildUrlWithParams(
  path: string,
  params: Record<string, string | number | boolean> = {}
): string {
  const url = new URL(path, 'https://api.coingecko.com/')

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  return url.toString()
}

export async function fetchWithParams<T = unknown>(
  path: string,
  { params = {}, revalidate = 3600 }: FetchOptions = {}
): Promise<T> {
  const url = new URL(path, 'https://api.coingecko.com/')

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  const res = await fetch(url.toString(), {
    next: { revalidate },
  })

  if (!res.ok) {
    return [] as T
  }

  return res.json()
}

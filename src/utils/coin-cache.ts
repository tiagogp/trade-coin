import axios from "axios";
import type { ICoinProps, ICoinResponse } from "../services/types";

type CacheData = {
  data: ICoinProps[];
  updatedAt: number;
};

const CACHE_KEY = "__COIN_CACHE__";
const CACHE_TTL = 1000 * 60 * 60; // one hour

export async function getTopCoins(): Promise<ICoinProps[]> {
  const now = Date.now();
  const cache = (globalThis as any)[CACHE_KEY] as CacheData | undefined;

  if (cache && now - cache.updatedAt < CACHE_TTL) {
    return cache.data;
  }

  const res = await axios.get<ICoinResponse>(
    `${import.meta.env.PUBLIC_BASE_API}/assets?apiKey=${
      import.meta.env.PUBLIC_KEY_API
    }`
  );

  const coins = res.data.data;

  (globalThis as any)[CACHE_KEY] = {
    data: coins,
    updatedAt: now,
  };

  return coins;
}

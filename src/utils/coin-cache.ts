import axios from "axios";
import type { ICoinProps, ICoinResponse } from "../services/types";

type CacheData = {
  data: ICoinProps[];
  updatedAt: number;
};

const CACHE_KEY = "__COIN_CACHE__";
const CACHE_TTL = 1000 * 60 * 60; // one hour

function formatAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const statusText = error.response?.statusText;
    const code = error.code;

    const parts = [
      "Request failed.",
      status ? `HTTP ${status}${statusText ? ` ${statusText}` : ""}.` : null,
      code ? `Code: ${code}.` : null,
      error.message ? `Message: ${error.message}` : null,
    ].filter(Boolean);

    return parts.join(" ");
  }

  if (error instanceof Error) return error.message;
  return "Unknown error.";
}

export async function getTopCoins(): Promise<ICoinProps[]> {
  const now = Date.now();
  const cache = (globalThis as any)[CACHE_KEY] as CacheData | undefined;

  if (cache && now - cache.updatedAt < CACHE_TTL) {
    return cache.data;
  }

  const baseApi = import.meta.env.PUBLIC_BASE_API?.replace(/\/$/, "");
  const apiKey = import.meta.env.PUBLIC_KEY_API;
  if (!baseApi) {
    throw new Error("Missing env var: PUBLIC_BASE_API");
  }
  if (!apiKey) {
    throw new Error("Missing env var: PUBLIC_KEY_API");
  }

  let res: { data: ICoinResponse };
  try {
    res = await axios.get<ICoinResponse>(`${baseApi}/assets?apiKey=${apiKey}`);
  } catch (error) {
    throw new Error(`getTopCoins() failed. ${formatAxiosError(error)}`);
  }

  const coins = res.data.data;

  (globalThis as any)[CACHE_KEY] = {
    data: coins,
    updatedAt: now,
  };

  return coins;
}

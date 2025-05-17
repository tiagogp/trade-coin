import { CoinGeckoClient } from "coingecko-api-v3";
import axios from "axios";

export const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

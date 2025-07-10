import { BASE_URL } from "../api";

export async function getTopCoins(vsCurrency = "usd") {
  const url = `${BASE_URL}/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

  const res = await fetch(url, {
    cache: "force-cache",
    // next: { revalidate: 3600 }, // 1 hora
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar dados da CoinGecko");
  }

  return await res.json();
}

import ListOfCoins from "@/components/list-of-coins";
import { getMarket } from "@/services/getMarket";
import Cookies from "js-cookie";

export const revalidate = 3600;

export default async function Home() {
  const currency = Cookies.get("currency") || "usd";
  const payload = await getMarket(currency);

  return (
    <main className="flex justify-center py-10 p-4">
      <ListOfCoins coins={payload} />
    </main>
  );
}

"use client";

import Image from "next/image";
import { FC, memo } from "react";

import { useCurrency } from "@/hooks/use-currency";
import {
  formatCurrencyShort,
  formatNumber,
  manualFormarNumber,
} from "@/lib/utils";
import Percentage from "./percentage";
import type { IMarket } from "@/interfaces/IMarket";
import { useRouter } from "next/navigation";

interface ItemOfListProps {
  coin: IMarket;
  id: number;
}

const ItemOfList: FC<ItemOfListProps> = ({ coin, id }) => {
  const { atualCurrency } = useCurrency();
  const { push } = useRouter();

  return (
    <div
      onClick={() => push(`/coin/${coin.id}`)}
      className={`flex flex-row gap-3 py-3 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-150 cursor-pointer items-center border-b last-of-type:border-b-0 `}
    >
      <div className="flex flex-row gap-3 flex-1 items-center justify-start ">
        <p className="text-sm text-gray-400">{++id}</p>
        <div className="hover:scale-125 duration-200 ease-in-out h-6 w-6">
          <Image
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-md"
          />
        </div>

        <h2 className="font-bold ">{coin.name}</h2>
        <p className="font-semibold text-gray-400">
          {coin.symbol?.toUpperCase()}
        </p>
      </div>
      <p className="flex flex-1 font-semibold justify-end">
        {coin.current_price > 1
          ? formatNumber(coin.current_price, atualCurrency)
          : manualFormarNumber(atualCurrency, coin.current_price)}
      </p>
      <div className="hidden sm:flex">
        <Percentage value={coin.price_change_percentage_24h} />
      </div>
      <p className="hidden  md:flex flex-1 justify-center font-semibold">
        {formatCurrencyShort(coin.market_cap, atualCurrency)}
      </p>
      <p className={`hidden  md:flex flex-1 justify-center font-semibold`}>
        {formatCurrencyShort(coin.total_volume, atualCurrency)}
      </p>
    </div>
  );
};

export default ItemOfList;

export const ItemOfListSkeleton: FC = () => {
  return (
    <div className="flex flex-row gap-3 py-3 px-4 duration-150 cursor-pointer items-center rounded-xl w-full animate-pulse">
      <div className="flex rounded-full bg-slate-200 dark:bg-[#383b56] h-8 w-8 "></div>
      <div className="h-4 bg-slate-200 dark:bg-[#383b56]  rounded-full flex-1"></div>
    </div>
  );
};

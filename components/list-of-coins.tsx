"use client";

import { FC } from "react";
import ItemOfList from "./Item-of-list";
import type { IMarket } from "@/interfaces/IMarket";

interface ListOfCoinsProps {
  coins: IMarket[];
}

const ListOfCoins: FC<ListOfCoinsProps> = ({ coins = [] }) => (
  <div className=" rounded-sm max-w-screen-xl w-full gap-2">
    {coins.map((item, index) => (
      <ItemOfList key={index} coin={item} id={index} />
    ))}
  </div>
);

export default ListOfCoins;

"use client";

import Link from "next/link";
import { FC, useState } from "react";

import ItemsHeaders from "../items-headers";
import Logo from "../logo";
import Search from "../search";
import ToggleMode from "./togglemode";

const Header: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 flex flex-col sm:flex-row gap-3 items-center w-full justify-center border-b sticky top-0">
      <div className="w-full flex max-w-screen-xl gap-y-2 flex-col sm:flex-row items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-7">
          <ItemsHeaders title="Cryptocurrencies" />
          <ItemsHeaders title="Exchanges" goToPage="/exchanges" />
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Search text={searchValue} setText={setSearchValue} />
          <div className="flex gap-2 justify-center items-center">
            {/* <CurrencyItem /> */}
            <ToggleMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

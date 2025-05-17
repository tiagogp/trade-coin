import { FC, useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { CgCloseO } from "react-icons/cg";
import Link from "next/link";
import { client } from "@/services/api";
import type { CoinListResponseItem } from "coingecko-api-v3";
import { motion } from "motion/react";

interface SearchProps {
  text: string;
  setText: (newText: string) => void;
}

interface SearchDates {
  id: string;
  symbol: string;
  name: string;
}

const correctSearch = (
  text: string,
  setText: (value: string) => void,
  date: SearchDates[],
  setFilter: (newDate: SearchDates[]) => void
) => {
  setText(text);
  const filterResult = date.filter(
    (item) =>
      item.name.toLowerCase().startsWith(text.toLowerCase()) ||
      item.symbol.startsWith(text.toLowerCase())
  );
  setFilter(filterResult);
};

const Search: FC<SearchProps> = ({ text, setText }) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState<CoinListResponseItem[]>();
  const [filterDate, setFilterDate] = useState<CoinListResponseItem[]>();

  const filtered = filterDate || date;

  const setBackgroundColor = focused
    ? "border-zinc-200 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-700"
    : "border-transparent bg-zinc-200 dark:bg-zinc-500/20";

  const closeModal = () => {
    const button = setTimeout(() => {
      setFocused(false);
    }, 500);

    return () => clearTimeout(button);
  };

  useEffect(() => {
    (async () => {
      const atualCoins = localStorage.getItem("idsCoins")
        ? JSON.parse(localStorage.getItem("idsCoins"))
        : null;

      const payload = await client.coinList({ include_platform: false });

      if (atualCoins) {
        const dateAtualCoins = JSON.parse(localStorage.getItem("dateCoins"));

        if (
          new Date().getTime() - new Date(dateAtualCoins).getTime() <=
          86_400_000
        ) {
          setDate(atualCoins);
          return;
        }
      }

      setDate(payload);
      const timeAtual = new Date();
      localStorage.setItem("idsCoins", JSON.stringify(payload));
      localStorage.setItem("dateCoins", JSON.stringify(timeAtual));
    })();
  }, []);

  return (
    <div className="relative max-w-full">
      <div
        className={`flex flex-row items-center border z-30 ${setBackgroundColor} rounded-md py-2 sm:py-1 gap-1 px-2 relative overflow-hidden transition-all`}
      >
        <HiOutlineSearch size={18} className="text-zinc-400" />
        <input
          className="bg-transparent relative z-30 outline-none transition-all duration-200 ease-in-out text-sm py-1 placeholder:font-semibold font-semibold placeholder:text-zinc-400 focus:text-zinc-600 dark:focus:text-zinc-200  text-zinc-400 "
          type="text"
          value={text}
          placeholder="Search"
          onFocus={() => setFocused(true)}
          onBlur={closeModal}
          onChange={(e) =>
            correctSearch(e.target.value.trim(), setText, date, setFilterDate)
          }
        />

        <motion.span
          className={` cursor-pointer transition-all duration-150 ease-in-out text-zinc-400`}
          animate={{
            translateX: text.length > 0 ? 0 : 24,
            opacity: text.length > 0 ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.15, delay: 0.2 },
            translateX: { duration: 0.2 },
          }}
        >
          <CgCloseO size={18} onClick={() => text.length > 0 && setText("")} />
        </motion.span>
      </div>
      {focused && text.length > 0 && (
        <div className="absolute text-xs  bg-white dark:bg-zinc-800 pt-2 rounded-b-md top-8 w-full shadow-2xl overflow-hidden">
          {filtered?.slice(0, 10).map((item) => (
            <div
              className="flex cursor-pointer font-semibold w-full "
              key={`${item?.id + item?.name}`}
            >
              <Link
                className="flex gap-1 py-2 px-3 transition-all duration-200 ease-in-out text-zinc-600 dark:text-zinc-200 items-center hover:bg-indigo-600/15 dark:hover:bg-indigo-500/20 w-full justify-between"
                href={`/coin/${item.id}`}
              >
                <p>{item.name}</p>
                <p className="py-1 px-2 text-indigo-600 dark:text-indigo-200 dark:bg-indigo-500/30 bg-indigo-500/40 rounded-sm text-[0.6rem]">
                  {item.symbol?.toUpperCase()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

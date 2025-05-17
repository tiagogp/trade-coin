import { useCurrency } from "@/hooks/use-currency";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "motion/react";

const currency = ["usd", "eur", "brl"];

const CurrencyItem = () => {
  const { atualCurrency, setAtualCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    const button = setTimeout(() => {
      setIsVisible(false);
    }, 200);

    return () => clearTimeout(button);
  };

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        onBlur={() => closeModal()}
        className="relative w-full bg-white dark:bg-zinc-800 duration-150  rounded-md shadow-sm pl-3 pr-10 xl:pr-6 cursor-pointer ease-out  text-left outline-none dark:focus:border-zinc-500 border  sm:text-sm h-10 z-30"
      >
        <span className="flex items-center ">
          <Image
            src={`/${atualCurrency?.toUpperCase()}.png`}
            alt="currency"
            width={24}
            height={24}
          />
          <span className="ml-2 pr-2">{atualCurrency?.toUpperCase()}</span>
        </span>
        <span className=" absolute inset-y-0 right-0 flex flex-col items-center pr-3 pointer-events-none text-gray-400 justify-center">
          <FaChevronUp size={10} />
          <FaChevronDown size={10} />
        </span>
      </button>
      <motion.ul
        animate={{
          display: isVisible ? "block" : "none",
          opacity: isVisible ? 1 : 0,
          translateY: isVisible ? 0 : -50,
        }}
        transition={{
          opacity: { duration: 0.15, delay: 0.1 },
          translateY: { duration: 0.3 },
          display: { duration: 0.15, delay: 0.1 },
        }}
        className={`absolute z-10 mt-1 w-full bg-white  dark:bg-zinc-800 shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        {currency.map((item) => (
          <li
            key={item}
            className={`${
              atualCurrency === item && "bg-indigo-500/15 dark:bg-indigo-500/10"
            } text-gray-900 dark:text-slate-100 cursor-pointer hover:bg-indigo-500/10 dark:hover:bg-indigo-500/5 duration-75 select-none flex items-center relative py-2 pl-3 pr-9`}
            id="listbox-option-0"
            role="option"
            onClick={() => isVisible && setAtualCurrency(item)}
          >
            <Image
              src={`/${item?.toUpperCase()}.png`}
              alt={item}
              width={24}
              height={24}
            />
            <span className="font-normal ml-3 block">
              {item?.toUpperCase()}
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default CurrencyItem;

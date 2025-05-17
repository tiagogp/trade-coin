"use client";

import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { FC } from "react";

interface ItemsHeaders {
  title: string;
  goToPage?: "/" | "/exchanges";
}

const ItemsHeaders: FC<ItemsHeaders> = ({ title, goToPage = "/" }) => {
  const { push } = useRouter();

  return (
    <div onClick={() => push(goToPage)} className="justify-center items-center">
      <p className="dark:text-white font-semibold cursor-pointer hover:text-cyan-500 duration-150 hover:tracking-wider ease-in-out">
        {title?.toUpperCase()}
      </p>
    </div>
  );
};

export default ItemsHeaders;

import logo from "../assets/logo-light.svg";
import { cn } from "../lib/utils";

type HeaderProps = {
  showColumns?: boolean;
};

export const Header = ({ showColumns = true }: HeaderProps) => (
  <div
    className={cn(
      " flex flex-col items-center justify-between border-zinc-800 border-b gap-1"
    )}
  >
    <div className={cn("flex items-center justify-between w-full px-4 py-3")}>
      <a href="/">
        <img
          src={logo.src}
          alt="Logo"
          className="w-16"
          width={logo.width}
          height={logo.height}
        />
      </a>

      <input
        placeholder="search"
        className="border-zinc-700 border px-2 py-1 rounded-sm outline-0 ring-yellow-500/80 focus:ring flex-1 max-w-xs"
      />
    </div>

    {showColumns ? (
      <div className="flex items-center w-full border-zinc-800 border-t py-2 px-4">
        <div className="flex flex-1">
          <p className="font-semibold text-gray-400">Name</p>
        </div>

        <p className="flex-1 text-right">
          <p className="font-semibold text-gray-400">Price</p>
        </p>
        <p className="flex-1 text-right">
          <p className="font-semibold text-gray-400">Market cap</p>
        </p>
        <p className="flex-1 text-right">
          <p className="font-semibold text-gray-400">Supply</p>
        </p>
        <p className="flex-1 text-right">
          <p className="font-semibold text-gray-400">Volume (24Hr)</p>
        </p>
      </div>
    ) : null}
  </div>
);

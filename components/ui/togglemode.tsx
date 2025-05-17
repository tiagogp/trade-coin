import { useTheme } from "next-themes";
import { FC } from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";

const ToggleMode: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex hover:border-border transition-all border border-transparent text-gray-400 dark:text-slate-300 justify-center items-center rounded-lg border-slate-300 h-10 w-10"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <BsSun /> : <BsFillMoonStarsFill />}
    </button>
  );
};

export default ToggleMode;

import { useTheme } from "next-themes";
import Image from "next/image";
import { FC } from "react";

interface LogoProps {
  classname?: string;
}

const Logo: FC<LogoProps> = ({ classname = "w-20" }) => {
  const { theme } = useTheme();

  console.log(theme);
  const imgName = theme === "light" ? "logo" : "logo-light";
  return (
    <Image
      src={`/${imgName}.svg`}
      className={`active:scale-90 transition-all duration-100  ${classname}`}
      width={200}
      height={50}
      alt="logo"
    />
  );
};
export default Logo;

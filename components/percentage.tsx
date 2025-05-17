import { FC } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface PercetageProps {
  value: number;
}

const Percentage: FC<PercetageProps> = ({ value }) => (
  <div
    className={`flex font-semibold items-center ${
      value > 0 ? "text-green-500" : "text-red-500"
    }`}
  >
    {value > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
    <p className=" sm:flex  justify-end md:justify-center ">
      {value?.toFixed(2).toString().replace("-", "")}%
    </p>
  </div>
);

export default Percentage;

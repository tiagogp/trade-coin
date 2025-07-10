import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface PercetageProps {
  value: number;
}

const Percentage = ({ value }: PercetageProps) => (
  <div
    className={`flex font-semibold items-center ml-2 ${
      value > 0 ? "text-green-500" : "text-red-500"
    }`}
  >
    {value > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
    <p className=" sm:flex justify-end md:justify-center ">
      {value?.toFixed(2).toString().replace("-", "")}%
    </p>
  </div>
);

export default Percentage;

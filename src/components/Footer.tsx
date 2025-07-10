import { AiFillGithub } from "react-icons/ai";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 px-4 border-t border-zinc-800 flex justify-between items-center text-sm">
      <button className="flex gap-2 items-center cursor-pointer active:scale-90 transition-all">
        <AiFillGithub size={20} />
        <p>Source code</p>
      </button>
      <p>© {year} Tiago Guimarães Pinto. All rights reserved</p>
    </footer>
  );
};

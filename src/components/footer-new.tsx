import { AiFillGithub } from 'react-icons/ai'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='py-2 px-4 border-t border-zinc-800 flex justify-between items-center text-sm'>
      <button className='flex gap-2 items-center cursor-pointer active:scale-90 transition-all rounded-md border border-transparent px-3 p-2 hover:border-zinc-600'>
        <AiFillGithub size={20} />
        <p className='text-zinc-500'>Source code</p>
      </button>
      <p className='font-medium'>
        © {year} Tiago Guimarães Pinto. All rights reserved
      </p>
    </footer>
  )
}

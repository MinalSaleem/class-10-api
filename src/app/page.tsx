"use client"

import BooksUI from "./components/bookui/page";
import { useRouter } from "next/navigation"
import { IoSearch } from "react-icons/io5";


export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-zinc-900 h-full">

      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-6 md:py-8">
        <h1 className="text-slate-100 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-center mb-6 md:mb-0">Welcome to the Book Management App</h1>
        <button  onClick={()=>router.push('/components/all')} className="bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-400 md:text-lg md:w-auto py-2 md:py-3 px-6 h-10 md:mt-4 md:mr-3 flex items-center justify-center">
          <p className="flex flex-row gap-2 font-medium">More books<IoSearch /></p>
        </button>
      </header>

      <BooksUI />
      
    </div>
  )
}


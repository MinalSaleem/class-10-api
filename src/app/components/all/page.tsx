import React from 'react';
import MenuCard from './MenuCard';
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";

export default function All() {
  return (
    <div className='bg-zinc-900'>
      <div  className='text-slate-100 text-4xl font-serif font-bold mb-6 mx-6 text-center py-9 h-32 tracking-widest md:text-5xl'>
        <Link href="../../../../"><IoMdArrowRoundBack   className='bg-red-500 rounded-lg w-24 md:w-32'/></Link>
        <h1 className='flex justify-center'>All Books</h1>
      </div>

      <div className='mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20 content-around px-5'>
        <MenuCard 
          id={1}
          title="The Adventures of Huckleberry Finn" 
          image="/1.jpg" 
          author='Mark Twain'
        />
        <MenuCard 
          id={2}
          title="The Kite Runner" 
          image="/2.jpg" 
          author='Khaled Hosseini'
        />
        <MenuCard 
          id={3}
          title="The Alchemist" 
          image="/3.jpg" 
          author='Paulo Coelho'
        />
        <MenuCard 
          id={4}
          title="A Thousand Splendid Suns" 
          image="/4.webp" 
          author='Khaled Hosseini'
        />
        <MenuCard 
          id={5}
          title="The Forty Rules of Love" 
          image="/5.jpg" 
          author='Leo Tolstoy'
        />
        <MenuCard 
          id={6}
          title="War and Peace" 
          image="/6.jpeg" 
          author='Leo Tolstoy'
        />
        <MenuCard 
          id={7}
          title="The Great Gatsby" 
          image="/7.jpeg" 
          author='F. Scott Fitzgerald'
        />
        <MenuCard 
          id={8}
          title="In Search of Lost Time" 
          image="/8.jpg" 
          author='Marcel Proust'
        />
        <MenuCard 
          id={9}
          title="Hamlet" 
          image="/9.jpeg" 
          author='William Shakespeare'
        />
        <MenuCard 
          id={10}
          title="Ulysses" 
          image="/10.jpeg" 
          author='James Joyce'
        />
        <MenuCard 
          id={11}
          title="Great Expectations" 
          image="/11.jpeg" 
          author='Charles Dickens'
        />
        <MenuCard 
          id={12}
          title="Crime and Punishment" 
          image="/12.jpeg" 
          author='Fyodor Dostoevsky'
        />
        <MenuCard 
          id={13}
          title="To the Lighthouse" 
          image="/13.webp" 
          author='Virginia Woolf'
        />
        <MenuCard 
          id={14}
          title="As I Lay Dying" 
          image="/14.jpg" 
          author='William Faulkner'
        />
        <MenuCard 
          id={15}
          title="The Magic Mountain" 
          image="/15.jpg" 
          author='Thomas Mann'
        />
      </div>
    </div>
  )
}

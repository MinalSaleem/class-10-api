"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string | ArrayBuffer | null;
}

export default function BooksUI() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Partial<Book>>({ title: '', author: '', image: '' });
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Partial<Book>>({});

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);

  const addBook = async () => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      const addedBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, addedBook.book]);
      setNewBook({ title: '', author: '', image: '' });
    }
  };

  const deleteBook = async (id: number) => {
    const response = await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  const updateBook = async () => {
    if (editingBookId !== null) {
      const response = await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingBookId, ...updatedBook }),
      });
      if (response.ok) {
        const updated = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === editingBookId ? { ...book, ...updated.book } : book
          )
        );
        setEditingBookId(null);
        setUpdatedBook({});
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewBook({ ...newBook, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-slate-100">
      <div>
      <h1 className="text-slate-100 text-3xl font-serif font-bold mb-6 mx-6 text-center py-9 tracking-widest">Book List</h1>

      <ul className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-5 justify-center">
        {books.map((book) => (
          <li key={book.id} className="mb-4 bg-slate-100 text-black font-semibold rounded-lg p-6 mx-4 flex flex-col md:w-[280px] lg:w-[300px] w-full">
            <Image
              src={typeof book.image === 'string' ? book.image : ''}
              alt={book.title}
              width={300}
              height={400}
              className="w-full md:h-[350px] h-[250px] object-contain"
            />
            {editingBookId === book.id ? (
                <div>
                  <input type="text" value={updatedBook.title || book.title}
                    onChange={(e) => setUpdatedBook((prev) => ({ ...prev, title: e.target.value }))}
                    className="block mb-2 p-1 w-full" />

                  <input type="text" value={updatedBook.author || book.author}
                    onChange={(e) => setUpdatedBook((prev) => ({ ...prev, author: e.target.value }))}
                    className="block mb-2 p-1 w-full" />

                  <button onClick={updateBook} className="bg-green-500 text-white px-2 py-1 mt-2 w-24 rounded-lg">Save</button>

                  <button onClick={() => setEditingBookId(null)} className="bg-gray-500 text-white px-2 py-1 mt-2 ml-2 w-24 rounded-lg">Cancel</button>
                </div>
              ) : (
              <div>
                <div>{book.title} by {book.author}</div>
                <div className='flex gap-2 mt-2'>
                <button onClick={() => setEditingBookId(book.id)} className="ml-2 px-2 mt-2 bg-red-700 text-white font-semibold w-full md:w-32 rounded-lg py-2">Edit</button>
                <button onClick={() => deleteBook(book.id)} className="ml-2 px-2 mt-2 bg-red-700 text-white font-semibold w-full md:w-32 rounded-lg py-2">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>
      <div className='flex flex-col items-center space-y-4 md:w-2/3 lg:w-1/2 mx-auto mt-8 px-6'>
        <h2 className="text-slate-100 text-2xl sm:text-3xl font-serif font-semibold mx-6 text-center pt-6 h-32">Add a New Book</h2>
        <input type="text" placeholder="Title"  value={newBook.title || ''} 
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="block mb-2 p-2 w-full sm:w-80 md:w-96 px-4 py-2 text-sm bg-zinc-800 text-gray-200 placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600" />
        <input type="text" placeholder="Author" value={newBook.author || ''} 
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="block mb-2 p-2 w-full sm:w-80 md:w-96 px-4 py-2 text-sm bg-zinc-800 text-gray-200 placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600" />
        <input type="file" onChange={handleFileChange}
          className="block mb-2 p-2 w-full sm:w-80 md:w-96 px-4 py-2 text-sm bg-zinc-800 text-gray-200 placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600" />
        <button onClick={addBook} className="bg-red-700 text-white px-4 py-2 mt-4 rounded-lg w-full sm:w-44 md:w-48">Add Book</button>
      </div>
    </div>
  );
}

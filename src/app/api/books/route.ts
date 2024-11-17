import { NextResponse } from 'next/server';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

let books: Book[] = [

  { id: 2, title: "Ulysses", author: "James Joyce", image: "/10.jpeg" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", image: "/3.jpg" },
  { id: 6, title: "War and Peace", author: "Leo Tolstoy", image: "/6.jpeg" },
];

export async function GET() {
  try {
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error in fetching books." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBook: Book = {
      id: books.length ? books[books.length - 1].id + 1 : 1,
      title: body.title,
      author: body.author,
      image: body.image
    };
    books.push(newBook);
    return NextResponse.json(
      { message: 'Book added successfully', book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error adding book' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, author, image } = body;
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    books[index] = {
      ...books[index],
      title: title ?? books[index].title,
      author: author ?? books[index].author,
      image: image ?? books[index].image
    };
    return NextResponse.json(
      { message: "Book updated", book: books[index] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error in updating book" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    books = books.filter((book) => book.id !== id);
    return NextResponse.json(
      { message: "Book deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error deleting book' },
      { status: 500 }
    );
  }
}

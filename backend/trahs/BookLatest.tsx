"use client";

import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  updatedAt: string;
}

const BooksLatest = ({ books, timeAgo, truncateTitle }:{books: Book[], timeAgo:(date: string) => string,truncateTitle: (title: string, maxLength: number) => string}) => {
  if (books.length === 0) {
    return <p className="text-gray-400 text-center">No books available.</p>;
  }
  
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
        Latest Books
      </h1>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-3 gap-7 justify-items-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center md:w-full w-32 gap-2 mx-2 max-w-max md:max-w-xs p-4 md:bg-gray-800 bg-none rounded-lg shadow-md"
          >
            <div className="md:w-full md:h-full w-28 h-48 mb-4 relative overflow-hidden rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 text-center">
              <h4 className="md:text-lg text-sm font-semibold mb-2">
                {truncateTitle(book.title, 16)}
              </h4>
              <p className="text-gray-400 md:text-sm text-xs">
                by {book.author}
              </p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-500 text-center text-xs">
                {timeAgo(book.updatedAt)}
              </p>
              <div className="justify-center flex">
                <Link
                  href={`/view/${book.id}`}
                  className="text-center w-14 md:w-20 py-2 md:py-3 text-sm md:text-base from-blue-300 to-purple-500 bg-gradient-to-tr flex items-center justify-center rounded-md h-6 hover:bg-blue-400 hover:to-purple-400 transition-colors duration-300"
                >
                  <p className="text-white">Read</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksLatest;

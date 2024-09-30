"use client";

import { formatDate } from "@/lib/utils";
import { ReadButton } from "@/app/components/btn/bookbtn";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedAt: Date;
  coverImage?: string;
}

interface BookListProps {
  books: Book[];
  timeAgo?: any;
  truncateTitle?: any
  className?: any;
}

const BookList: React.FC<BookListProps> = ({ books, timeAgo, truncateTitle, className }) => {
  return (
    <div className={`bg-gray-800 p-4 sm:p-6 rounded-md shadow-md ${className}`}>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-200">
        Daftar Buku
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <li key={book.id} className="flex flex-col justify-between px-2 py-4">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 md:h-72 object-cover rounded-md mb-4 shadow-sm"
            />
            <h3 className="text-md sm:text-lg font-semibold text-white">
              {truncateTitle ? truncateTitle(book.title) : book.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              {book.author}
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Published At: {timeAgo ? timeAgo(book.publishedAt) : formatDate(book.publishedAt.toString())}
            </p>
            <div className="mt-2 sm:mt-4 flex justify-center">
              <ReadButton id={book.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

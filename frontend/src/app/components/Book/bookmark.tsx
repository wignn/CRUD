import React from 'react';
import Image from 'next/image';
import { formatDate } from "@/lib/utils";
import { ReadButton, DeleteButton } from "@/app/components/btn/bookbtn";

interface Bookmark {
  id: string;
  book: {
    id: string;
    title: string;
    author: string;
    publishedAt: string;
    coverImage: string;
  };
}

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: () => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-6">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-gray-900 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105"
        >
          <div className="overflow-hidden rounded-t-lg">
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={bookmark.book.coverImage || "/default-cover.jpg"}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                alt={bookmark.book.title}
              />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow text-gray-300">
            <h2 className="text-base font-bold mb-2 text-center text-white">
              {bookmark.book.title}
            </h2>
            <p className="text-sm text-center">Author: {bookmark.book.author}</p>
            <p className="text-sm text-center mb-4">
              Published: {formatDate(bookmark.book.publishedAt.toString())}
            </p>
            <div className="flex flex-col space-y-2 mt-auto">
              <button className='hover:bg-blue-500 bg-slate-800 bg-gradient-to-br text-white py-2 px-4 rounded shadow-lg'>
                <ReadButton id={bookmark.book.id} />
              </button>
              <button className='hover:bg-blue-500 bg-slate-800 bg-gradient-to-br text-white py-2 px-4 rounded shadow-lg'>
                <DeleteButton bookId={bookmark.book.id} onDelete={onDelete} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;

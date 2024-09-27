"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { ReadButton } from "@/app/components/btn/bookbtn";
import { useSession } from "next-auth/react";
import { DeleteButton } from "@/app/components/btn/bookbtn";
import Loading from "./Loading";
import { API } from '@/lib/Api';
import axios from "axios";
import { usePathname } from "next/navigation";
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

const BookMark = () => {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/bookmarsk/${session?.user?.id}`);
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status !== "loading" && session?.user?.id) {
      fetchBookmarks();
    }
  }, [session, status]);

  if (loading) {
    return <Loading />;
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <p className="text-lg text-gray-300">No bookmarks found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-500">
      <div className="flex justify-center py-14">
        <div className="bg-gray-800 w-11/12 sm:w-4/5 md:py-6 md:px-8 py-4 px-4 rounded-lg shadow-lg bg-opacity-90">
          <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center text-white">
            My Bookmarks
          </h1>
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
                      <DeleteButton bookId={bookmark.book.id} userId={session?.user?.id} onDelete={fetchBookmarks} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMark;

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Axios from "axios";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { API } from "@/lib/Api";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  synopsis: string;
  status: string;
  chapters?: { id: string; title: string }[];
}

const Page = () => {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await Axios.get(`${API}/books/${bookId}`);
        setBook(bookResponse.data);
      } catch (error) {
        console.error("Failed to fetch book data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId, API]);
console.log(bookId)

const deleteChapter = async (chapterId: string) => {
  try {
    await Axios.delete(`${API}/chapter/delete?id=${chapterId}`); 
    if (book) {
      const updatedChapters = book.chapters.filter(chapter => chapter.id !== chapterId);
      setBook({ ...book, chapters: updatedChapters });
    }
  } catch (error) {
    console.error("Failed to delete chapter:", error);
  }
};


  if (loading) return <Loading />;

  if (!book)
    return (
      <p className="text-center mt-10 text-xl text-gray-400">Book not found.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="relative mb-10">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 rounded-lg backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide text-white drop-shadow-lg">
            {book.title}
          </h1>
          <p className="text-lg font-semibold text-gray-300">{book.author}</p>
          <span
            className={`inline-block px-6 py-2 mt-6 rounded-full text-white font-bold shadow-md ${
              book.status === "Ongoing" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>

      <div className="flex justify-center p-4">
        <div className="relative md:w-[350px] w-[175px] md:h-[500px] h-[250px] overflow-hidden rounded-lg shadow-xl flex justify-center">
          <Image
            src={book.coverImage}
            alt={book.title}
            width={350}
            height={500}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-md bg-opacity-50">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Synopsis</h2>
          <p className="text-base text-gray-300 leading-relaxed">
            {book.synopsis}
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href={`/Book/${bookId}/create`}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            Create New Chapter
          </Link>
        </div>

        {book.chapters && book.chapters.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-lg mx-5 md:text-2xl font-bold mb-4 text-gray-100">
              Chapters
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book.chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="text-base text-gray-300 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 hover:scale-105 transform-gpu"
                >
                  <Link
                    href={`/view/${book.id.replace(/ /g, "-")}/${chapter.id.replace(
                      / /g,
                      "-"
                    )}`}
                  >
                    <span className="truncate">{chapter.title}</span>
                  </Link>
                  <div className="flex mt-2 space-x-2">
                    <Link
                      href={`/${chapter.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteChapter(chapter.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-400">No chapters available</p>
        )}
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Axios from "axios";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { API } from "@/lib/Api";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  synopsis: string;
  status: string;
  chapters?: { id: string; title: string }[];
  genre: { id: number; name: string }[];
}

interface Genre {
  id: number;
  name: string;
  books: { id: any; title: string }[];
}

const Page = () => {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [filteredGenres, setFilteredGenres] = useState<Genre[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<Set<number>>(new Set());
  const [deletingGenreIds, setDeletingGenreIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const bookResponse = await Axios.get(`${API}/books/${bookId}`);
      setBook(bookResponse.data);

      const genreData = await Axios.get(`${API}/genre`);
      setAllGenres(genreData.data);

      const associatedGenreIds = new Set(bookResponse.data.genre.map((g: Genre) => g.id));
      const availableGenres = genreData.data.filter((g: Genre) => !associatedGenreIds.has(g.id));
      setFilteredGenres(availableGenres);
    } catch (error) {
      setError("Failed to load book or genres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchData();
    }
  }, [bookId]);

  const handleCheckboxChange = (genreId: number) => {
    setSelectedGenreIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(genreId)) {
        newSet.delete(genreId);
      } else {
        newSet.add(genreId);
      }
      return newSet;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!bookId) {
      setError("Book ID is missing.");
      return;
    }
    setSubmitting(true);
    try {
      await Axios.post(`${API}/genre/conect`, {
        bookId,
        genreIds: Array.from(selectedGenreIds),
      });
      await fetchData();
    } catch (err) {
      setError("Failed to add genres.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      await Axios.delete(`${API}/chapter/delete?id=${chapterId}`);
      if (book) {
        const updatedChapters = book.chapters?.filter((chapter) => chapter.id !== chapterId);
        setBook({ ...book, chapters: updatedChapters });
      }
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  
  const handleDeleteGenre = async (genreId: number) => {
    setDeletingGenreIds((prev) => new Set(prev).add(genreId));
    try {
      await Axios.put(`${API}/genre/disconect`, {
         bookId, genreId ,
      });
      await fetchData();
    } catch (error) {
      setError("Failed to delete genre.");
    } finally {
      setDeletingGenreIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(genreId);
        return newSet;
      });
    }
  };


  if (loading) return <Loading />;

  if (!book) return <p className="text-center mt-10 text-xl text-gray-400">Book not found.</p>;

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
          {book.genre.map((genre) => (
          <div key={genre.id} className="flex mb-2">
            <span className="text-lg mr-4">{genre.name}</span>
            <button
              onClick={() => handleDeleteGenre(genre.id)}
              disabled={deletingGenreIds.has(genre.id)}
              className={`bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors ${
                deletingGenreIds.has(genre.id) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {deletingGenreIds.has(genre.id) ? "Deleting..." :  <FaTrash size={15}/>}
            </button>
          </div>
        ))}
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
          <p className="text-base text-gray-300 leading-relaxed">{book.synopsis}</p>
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
            <h2 className="text-lg mx-5 md:text-2xl font-bold mb-4 text-gray-100">Chapters</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book.chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="text-base text-gray-300 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 hover:scale-105 transform-gpu"
                >
                  <Link
                    href={`/view/${book.id.replace(/ /g, "-")}/${chapter.id.replace(/ /g, "-")}`}
                  >
                    <span className="truncate">{chapter.title}</span>
                  </Link>
                  <div className="flex mt-2 space-x-2">
                    <Link
                      href={`/${chapter.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
                    >
                      <FaEdit size={15}/>
                    </Link>
                    <button
                      onClick={() => deleteChapter(chapter.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                    >
                      <FaTrash size={15}/>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-400">No chapters available</p>
        )}

        <form onSubmit={handleSubmit} className="mt-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-100">Genres</h2>
          {filteredGenres.map((genre: Genre) => (
            <div key={genre.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={genre.id}
                checked={selectedGenreIds.has(genre.id)}
                onChange={() => handleCheckboxChange(genre.id)}
                className="mr-2 h-5 w-5 accent-blue-500"
              />
              <label className="text-lg">{genre.name}</label>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
            disabled={submitting || selectedGenreIds.size === 0}
          >
            {submitting ? "Applying..." : "Apply Filters"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

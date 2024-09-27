"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { book, genre } from "./data"; // Ensure book and getGenres are functions or API calls
import addGenre from "../../../lib/actionGenre";

const GenreContent = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(addGenre, null);

  useEffect(() => {
    const fetchBooksAndGenres = async () => {
      try {
        const bookData = await book();
        setBooks(bookData);
        const genreData = await genre();
        setGenres(genreData);
      } catch (err) {
        setError("Failed to load books or genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndGenres();
  }, []);

  const handleCheckboxChange = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) => {
      const newSelectedGenres = new Set(prevSelectedGenres);
      if (newSelectedGenres.has(genreId)) {
        newSelectedGenres.delete(genreId)
        ;
      } else {
        newSelectedGenres.add(genreId);
      }
      return newSelectedGenres;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-600 text-white min-h-full min-w-full p-4">
      <h1 className="text-2xl font-bold">Genres and Books</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select Genres</h2>
        <form action={formAction}>
          {genres.map((genre) => (
            <div key={genre.id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="genreId"
                  name="genreId"
                  value={genre.id}
                  checked={selectedGenres.has(genre.id)}
                  onChange={() => handleCheckboxChange(genre.id)}
                  className="mr-2"
                />
                {genre.name}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Apply Filters
          </button>
        </form>
      </div>
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-4">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <ul>
                {book.genre.map((genre) => (
                  <li key={genre.id}>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {books.length === 0 && <p>No books available.</p>}
    </div>
  );
};

export default GenreContent;

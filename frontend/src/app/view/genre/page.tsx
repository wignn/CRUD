import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { API } from "@/lib/Api";
import axios from "axios";

interface Genre {
  id: number;
  name: string;
  books: { id: any; title: string }[]; 
}

const BookDetails = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]); 
  const [filteredGenres, setFilteredGenres] = useState<Genre[]>([]); // Sama di sini
  const [selectedGenreIds, setSelectedGenreIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();

  const fetchBooksAndGenres = async () => {
    try {
      const bookData = await axios.get(`${API}/book/${bookId}`);
      setBooks(bookData.data);

      const genreData = await axios.get(`${API}/genres`);
      setAllGenres(genreData.data);

      const associatedGenreIds = new Set(bookData.data[0].genre.map((g: Genre) => g.id));
      const availableGenres = genreData.data.filter((g: Genre) => !associatedGenreIds.has(g.id));
      setFilteredGenres(availableGenres);
    } catch (err) {
      setError("Failed to load books or genres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksAndGenres();
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
      const response = await axios.post(`${API}/genre`, {
        bookId,
        genreIds: Array.from(selectedGenreIds),
      });
      await fetchBooksAndGenres();
    } catch (err) {
      setError("Failed to add genres.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-900 text-white md:p-8 p-0">
          {books.length > 0 && (
            <div className="relative mb-10">
              <Image
                src={books[0].coverImage}
                alt={books[0].title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
                <h1 className="text-5xl font-extrabold mb-4">{books[0].title}</h1>
                <p className="text-xl font-semibold text-gray-300">{books[0].author}</p>
                <p className="mt-4 text-lg font-medium text-gray-400">
                  {books[0].genre.map((g: Genre) => g.name).join(", ")}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookDetails;

"use client"
import { GetDashboard } from "../../../lib/dashboardAction";
import Search from "../dist/searchBook";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import BookList from "../Book/BookList"; 
import GenreSelector from "../Book/genreSelect"; 

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedAt: Date;
  coverImage?: string;
  status: string;
}

interface DashboardProps {
  query: string;
}

const Dashboard:React.FC <DashboardProps> = ({ query })=> {
  const [books, setBooks] = useState<Book[]>([]);
  const [genre, setGenre] = useState("");

  const fetchBooks = async () => {
    const fetchedBooks: Book[] = await GetDashboard(query, genre);
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    fetchBooks(); 
  }, [query, genre]);

  const totalBooks = books.length;
  const borrowedBooks = books.filter((book) => book.status === "Drop").length;
  const ongoing = totalBooks - borrowedBooks;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
        <header className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 rounded-md shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold text-white mr-3">
            Dashboard
          </h1>
          <Search />
        </header>
        <GenreSelector selectedGenre={genre} onSelect={setGenre} /> 
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8 mb-6">
          <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
              Total Books
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-white">
              {totalBooks}
            </p>
          </div>
          <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
              Borrowed Books
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-white">
              {borrowedBooks}
            </p>
          </div>
          <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
              Available Books
            </h2>
            <p className="text-2xl sm:text-3xl font-semibold text-white">
              {ongoing}
            </p>
          </div>
        </div>

        <BookList books={books} />
      </div>
    </div>
  );
}

export default Dashboard;
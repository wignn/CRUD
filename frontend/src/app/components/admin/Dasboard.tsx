"use client";
import { GetDashboard } from "@/lib/dashboardAction";
import React, { useEffect, useState } from "react";
import Search from "@/app/components/searchBook";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { API } from "@/lib/Api";
import Swal from "sweetalert2"; 

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedAt: Date;
  coverImage?: string;
}

interface DashboardProps {
  query: string;
}

const BooksEdite: React.FC <DashboardProps> =({ query })=> {
  const [books, setBooks] = useState<Book[]>([]);
  let genre = "";
  
  const fetchBooks = async () => {
    const result = await GetDashboard(query, genre);
    setBooks(result);
  };
  
  useEffect(() => {
    fetchBooks();
  }, [query]);

  const deleteBook = async (bookId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API}/Book/delete`, { data: { bookId } });
        Swal.fire('Deleted!', 'Your book has been deleted.', 'success');
        fetchBooks(); 
      } catch (error) {
        console.error("Failed to delete the book:", error);
        Swal.fire('Error!', 'Failed to delete the book.', 'error');
      }
    }
  };

  return (
    <main className="flex-1 p-6 sm:p-4 transition-margin duration-300 lg:ml-64">
      <div className="justify-center flex mb-4">
        <Search />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 sm:p-2 shadow-lg transition-transform transform hover:scale-105 duration-300 flex flex-col items-center"
          >
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-40 w-28 sm:h-32 sm:w-24 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-lg font-semibold text-white text-center mb-2">
              {book.title}
            </h2>
            <p className="text-gray-300 mb-4 text-sm text-center">{book.author}</p>
            <div className="flex space-x-2">
              <Link href={`/Book/${book.id}`} passHref>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-150 transform hover:scale-105">
                  <FaEye size={16} />
                </button>
              </Link>
              <Link href={`/Book/${book.id}/edit`} passHref>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 transform hover:scale-105">
                  <FaEdit size={16} />
                </button>
              </Link>
              <button
                onClick={() => deleteBook(book.id)} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-150 transform hover:scale-105"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default BooksEdite;
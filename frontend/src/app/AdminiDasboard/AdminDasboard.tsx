"use client";
import { GetDashboard } from "@/lib/dashboardAction";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../components/searchBook";
import Link from "next/link";

interface book {
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

export default function BooksEdite({ query }: DashboardProps) {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await GetDashboard(query);
      setBooks(result);
    };
    fetchBooks();
  }, [query]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow">
        <div className="p-4 text-xl font-bold">Admin Dashboard</div>
        <nav className="p-4">
          <ul>
            <li className="p-2 hover:bg-gray-200">Daftar Buku</li>
            <Link href={"/Book"}>
              <li className="p-2 hover:bg-gray-200">Tambah Buku</li>
            </Link>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="justify-center flex">
          <Search />
        </div>
        <h1 className="text-2xl font-bold mb-4">Daftar Buku</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 shadow rounded flex flex-col items-center"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-32 w-24 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-500 mb-4">{book.author}</p>
              <div className="flex space-x-2">
                <Link href={`/Book/${book.id}`}>
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Lihat Detail
                </button>
                </Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </button>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BooksLatest from "../../../backend/trahs/BookLatest";
import { Contact } from "./components/contact";
import FeatureList from "./components/Extend";
import Home from "./components/Hero";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import {API} from '@/lib/Api'

const Landing = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const fetchBooks = async () => {
    setError(null);
    try {
      const response = await axios.get(`${API}/book`);
      const sortedBooks = response.data.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setBooks(sortedBooks);
    } catch (err) {
      setError("Error fetching books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBooks();
  }, [API]);

  const timeAgo = (date: string) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const differenceInSeconds = Math.floor(
      (now.getTime() - updatedDate.getTime()) / 1000
    );

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(differenceInSeconds / seconds);
      if (interval > 1) return `${interval} ${unit}s ago`;
      if (interval === 1) return `1 ${unit} ago`;
    }
    return "just now";
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500 border-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <Home />
      <FeatureList
        className={"bg-gray-900 bg-opacity-40 backdrop-blur-lg backdrop-filter w-full"}
      />
      <BookList
        books={books}
        timeAgo={timeAgo}
        truncateTitle={truncateTitle}
        className={"bg-gray-900 text-white text-center"}
      />
      <Contact />
    </div>
  );
};

export default Landing;

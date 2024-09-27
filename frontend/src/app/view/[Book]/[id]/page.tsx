"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {API} from '@/lib/Api'
import Navbar from "@/app/components/Navbar";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string | null;
  synopsis: string;
  status: string;
  chapters: Chapter[];
}

const ChapterContent = () => {
  const [content, setContent] = useState<Chapter | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [textSize, setTextSize] = useState("text-base");
  const pathname = usePathname();
  const router = useRouter();

  const pathParts = pathname.split("/").filter((part) => part);
  const chapterId = pathParts[2]; console.log(chapterId)
  const bookId = pathParts[1]

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const chapterResponse = await axios.get(
          `${API}/chapter/${chapterId}`
        );

        console.log("Chapter Response:", chapterResponse.data);

        if (!chapterResponse.data || !chapterResponse.data.book) {
          throw new Error("Chapter or associated book not found.");
        }

        setContent(chapterResponse.data);
        const bookResponse = await axios.get(
          `${API}/books/${bookId}`
        );
        setBook(bookResponse.data);
      } catch (err) {
        console.error("Gagal memuat konten chapter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }

  if (!content || !book) {
    return (
      <div className="text-red-500">Chapter atau buku tidak ditemukan.</div>
    );
  }

  if (!content.content) {
    return (
      <div className="text-yellow-500">Konten chapter kosong.</div>
    );
  }

  const currentChapterIndex = book.chapters.findIndex(
    (ch) => ch.id === content.id
  );
  const nextChapter = book.chapters[currentChapterIndex + 1];
  const prevChapter = book.chapters[currentChapterIndex - 1];

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-200">
        <div className="w-full mt-10 md:max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-start md:text-center">
              {content.title}
            </h1>
            <select
              className="bg-gray-700 text-white rounded px-2 py-1"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
            >
              <option value="text-sm">Small</option>
              <option value="text-base">Medium</option>
              <option value="text-lg">Large</option>
              <option value="text-xl">Extra Large</option>
            </select>
          </div>
          <section
            className={`mt-5 ${textSize}`}
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
          <div className="mt-5 flex justify-between w-full mb-16">
            {prevChapter && (
              <div className="flex-1 text-left">
                <button
                  onClick={() => router.push(`/view/${book.id}/${prevChapter.id}`)}
                  className="bg-gradient-to-l from-gray-600 to-gray-700 text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 transition duration-200"
                >
                  Prev Chapter
                </button>
              </div>
            )}
            {nextChapter && (
              <div className="flex-1 text-right">
                <button
                  onClick={() => router.push(`/view/${book.id}/${nextChapter.id}`)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l hover:from-gray-500 hover:to-gray-600 transition duration-200"
                >
                  Next Chapter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;

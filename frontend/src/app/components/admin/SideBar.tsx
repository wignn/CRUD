"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-grow">
            <div
        className={`flex relative  transition-all duration-300 ease-in-out ${
          isOpen ? "md:grid-cols-3" : "md:grid-cols-4"
        } w-full ${isOpen ? '' : 'justify-center items-center flex-grow'}`}
      >
        {children}
      </div>
   
      <button
        onClick={toggleSidebar}
        className="p-4 text-white rounded-lg bg-black bg-opacity-80 backdrop-blur-md z-50 fixed top-4 left-4 lg:top-4 lg:left-4" // Atur posisi tombol toggle
        aria-label={isOpen ? "Tutup Sidebar" : "Buka Sidebar"}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 m-0 left-0  bg-opacity-90 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 m-0" : "m-0 -translate-x-full"
        }`}
      >
        <div className="p-6 text-xl font-bold text-white">Admin Dashboard</div>
        <nav className="px-4 py-2">
          <ul>
            <Link href="/Book" passHref>
              <li className="p-4 hover:bg-gray-800 text-white cursor-pointer rounded-md transition-colors">
                Daftar Buku
              </li>
            </Link>
            <Link href="/Book" passHref>
              <li className="p-4 hover:bg-gray-800 text-white cursor-pointer rounded-md transition-colors">
                Tambah Buku
              </li>
            </Link>
            <Link href="/Book/genreCreate" passHref>
              <li className="p-4 hover:bg-gray-800 text-white cursor-pointer rounded-md transition-colors">
                Tambah Genre
              </li>
            </Link>
          </ul>
        </nav>
      </aside>




  
      {isOpen && (
        <div
          className="fixed bg-black opacity-50 z-30 lg:hidden inset-0"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
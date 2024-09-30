"use client";
import React, { useEffect, useState } from "react";

import { MenuIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { API } from "@/lib/Api";


interface user {
  id: number;
  name: string;
  email: string;
  profile: { avatar: string; sampul: string };
}

const Navbar:React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<user>();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API}/users/${session?.user?.id}`);
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };
      fetchUserData();
    }
  }, [session, API]);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Logo</Link>
        </div>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <Link href="/dashboard" className="hover:text-gray-400">
            Novel
          </Link>
          <Link href="/bookmark" className="hover:text-gray-400">
            BookMark
          </Link>
        </div>

        {user && (
          <div className="relative z-50">
            <img
              src={user?.profile.avatar ?? '/about.jpg'}
              alt="Avatar"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg py-2">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  {user.name}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  {user.email}
                </a>
                <a
                  href="/profile/setting"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XIcon className="h-8 w-8" />
            ) : (
              <MenuIcon className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-800">
            Home
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-800">
            About
          </a>
          <a href="/dasboard" className="block px-4 py-2 hover:bg-gray-800">
            Novel
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-800">
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

"use client";

import { API } from "@/lib/Api";
import axios from "axios";
import { useState } from "react";

interface Genre {
  id: number;
  name: string;
}

const CreateBookForm = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API}/genre/create`, form);
      if (result.status === 200) {
        setMessage("Success: Genre successfully created!");

        // Hilangkan pesan setelah 3 detik
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
      console.log("Genre created:", result.data);
    } catch (err) {
      console.error("Error creating genre:", err);
    }
  };

  return (
    <div>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Add Genre
          </h1>

          {/* Tampilkan pesan jika ada */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="genreName"
                className="block text-sm font-medium text-gray-700"
              >
                Genre Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBookForm;

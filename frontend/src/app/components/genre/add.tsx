"use client";
import { API } from "@/lib/Api";
import axios from "axios";
import { useState } from "react";
import React from "react";


const CreateGenreForm: React.FC = ()=> {
  const [genre, setGenre] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API}/genre/create`, genre);
      console.log(response.data);
      setSuccess("Genre created successfully");
      setError("");
    } catch (error) {
      setError("Failed to create genre");
      setSuccess("");
      console.error(error);
    } finally {
      setTimeout(() => {
        setError("");
        setSuccess("");
        setGenre("");
      }, 5000);
    }
  };

  const handleChange = (e: any) => {
    setGenre({
      ...genre,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Create Genre
        </h2>

        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-gray-600 mb-2">
            Name:
          </label>
          <input
            id="name"
            name="name"
            value={genre.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter genre name"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
      </form>
    </div>
  );
}

export default CreateGenreForm

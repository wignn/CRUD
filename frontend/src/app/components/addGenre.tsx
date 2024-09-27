"use client"

import { useState } from "react";

// Definisikan tipe untuk genre dan checkedGenres
interface Genre {
  id: number;
  name: string;
}

interface CheckedGenres {
  [key: string]: boolean;
}

const CheckboxComponent = () => {
  // Array of genre options dengan tipe Genre[]
  const genres: Genre[] = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Fantasy" },
  ];

  // Inisialisasi state dengan tipe CheckedGenres
  const [checkedGenres, setCheckedGenres] = useState<CheckedGenres>(
    genres.reduce((acc, genre) => {
      acc[genre.name] = false;
      return acc;
    }, {} as CheckedGenres)
  );

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedGenres((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle submit atau display hasil
  const handleSubmit = () => {
    const selectedGenres = Object.keys(checkedGenres).filter(
      (genre) => checkedGenres[genre]
    );
    console.log("Selected genres:", selectedGenres);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select Genres</h2>

        {genres.map((genre) => (
          <label key={genre.id} className="flex items-center space-x-3 mb-2">
            <input
              type="checkbox"
              name={genre.name}
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={checkedGenres[genre.name]} // pastikan ini selalu mendapatkan nilai boolean
              onChange={handleCheckboxChange}
            />
            <span className="text-gray-700 font-medium">{genre.name}</span>
          </label>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CheckboxComponent;

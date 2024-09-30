"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import axios from "axios"; 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 
import { API } from "@/lib/Api";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateChapterForm: React.FC = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);
  const bookId = pathParts[1];
  const [form, setForm] = useState({
    title: "",
    content: "",
    bookId: bookId || "", 
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleContentChange = (value:any) => {
    setForm(prevForm => ({ ...prevForm, content: value }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API}/chapters/create`, form);

      if (response.data && response.data.error) {
        setErrorMessage("Failed to create chapter. Please try again.");
      } else {
        setSuccessMessage("Chapter created successfully!");
        setForm({
          title: "",
          content: "",
          bookId: bookId || "",
        });
      }
    } catch (error) {
      setErrorMessage("Failed to create chapter. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg w-full mx-auto mt-8 shadow-xl border border-gray-300">
      <form className="bg-white p-6 rounded-lg shadow-md bg-opacity-90" onSubmit={handleSubmit}>
        <input type="hidden" name="bookId" value={bookId} />
        
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Chapter Title..."
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="content" className="block text-sm font-medium text-gray-900">Content</label>
          <ReactQuill
            value={form.content}
            onChange={handleContentChange}
            className="w-full min-h-56"
          />
        </div>

        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

        <div className="mt-20">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md">Save</button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Preview:</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.content }} />
      </div>
    </div>
  );
};

export default CreateChapterForm;

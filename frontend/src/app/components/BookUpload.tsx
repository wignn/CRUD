//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleImageDropzone } from "./image";
import { useEdgeStore } from "@/lib/edgeStore";

interface Form {
  title: string;
  author: string;
  synopsis: string;
  image: string;
}
interface FileUrls {
  url: string;
}

export default function BookComponent() {
  const [form, setForm] = useState<Form>({
    title: "",
    author: "",
    synopsis: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [imageUrl, setImageUrl] = useState<FileUrls>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uploadUrlsToDatabase = async () => {
      try {
        await axios.post("http://localhost:4000/book/Create", {
          ...form,
          imageUrl: imageUrl?.url,
        });
        console.log("Image URL uploaded to database:", imageUrl?.url);
      } catch (error) {
        console.error("Error uploading URL to database:", error);
      }
    };
  
    if (imageUrl?.url) {
      uploadUrlsToDatabase();
    }
  }, [imageUrl]);
  

  const handleUpload = async () => {
    const confirmed = confirm("Are you sure you want to upload?");
    if (confirmed) {
      if (imageFile) {
        const uploadResult = await edgestore.myPublicImage.upload({
          file: imageFile,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        setImageUrl({ url: uploadResult.url });
        setForm((prev) => ({ ...prev, image: uploadResult.url }));
        console.log("Image uploaded:", uploadResult.url);
      }
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Image</h1>
      <form onSubmit={handleSubmit} className="text-black w-full">
        <div className="relative mb-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            required
            placeholder="title"
            className="w-full py-2 px-3 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
          />
          <label className="absolute left-3 -top-2.5 text-gray-500 text-sm transition-all duration-300 transform scale-75 origin-top-left">
            Title
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleInputChange}
            required
            placeholder="title"
            className="w-full py-2 px-3 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
          />
          <label className="absolute left-3 -top-2.5 text-gray-500 text-sm transition-all duration-300 transform scale-75 origin-top-left">
            Author
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="synopsis"
            value={form.synopsis}
            onChange={handleInputChange}
            required
            placeholder="title"
            className="w-full py-2 px-3 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
          />
          <label className="absolute left-3 -top-2.5 text-gray-500 text-sm transition-all duration-300 transform scale-75 origin-top-left">
            Synopsis
          </label>
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Upload Image
        </button>
      </form>

      <label className="mb-2 mt-4">Image</label>
      <SingleImageDropzone
        width={200}
        height={200}
        value={imageFile}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, 
        }}
        onChange={(file) => setImageFile(file)}
      />
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full mt-4">
          <div
            className="duration-150 transition-all bg-blue-500 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {imageUrl?.url && (
        <div className="flex flex-col items-center mt-4 space-y-2">
          <a
            href={imageUrl.url}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            View Uploaded Image
          </a>
        </div>
      )}
    </div>
  );
}

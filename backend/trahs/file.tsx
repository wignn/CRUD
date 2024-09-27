"use client";

import { useEdgeStore } from "@/lib/edgeStore";
import { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API } from "@/lib/Api";

interface FileUrls {
  url: string;
  thumbnailUrl: string;
}

export default function File() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [avatarUrl, setAvatarUrl] = useState<FileUrls>();
  const [coverUrl, setCoverUrl] = useState<FileUrls>();
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const [avatarCrop, setAvatarCrop] = useState({ x: 0, y: 0 });
  const [coverCrop, setCoverCrop] = useState({ x: 0, y: 0 });
  const [avatarZoom, setAvatarZoom] = useState(1);
  const [coverZoom, setCoverZoom] = useState(1);
  const [avatarCroppedAreaPixels, setAvatarCroppedAreaPixels] =
    useState<any>(null);
  const [coverCroppedAreaPixels, setCoverCroppedAreaPixels] =
    useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    const uploadUrlsToDatabase = async () => {
      if (avatarUrl || coverUrl) {
        try {
          await axios.put(`${API}/profile/create`, {
            Id: session?.user?.id,
            avatarUrl: avatarUrl?.url,
            coverUrl: coverUrl?.url,
          });
          console.log("URL uploaded to database:", { avatarUrl, coverUrl });
        } catch (error) {
          console.error("Error uploading URL to database:", error);
        }
      }
    };

    uploadUrlsToDatabase();
  }, [avatarUrl, coverUrl]);

  const handleUpload = async () => {
    const confirmed = confirm("Are you sure you want to upload?");
    if (confirmed) {
      if (avatarFile && avatarCroppedAreaPixels) {
        const croppedAvatarImage = await getCroppedImg(
          avatarPreview,
          avatarCroppedAreaPixels
        );
        const avatarResult = await edgestore.myPublicImage.upload({
          file: croppedAvatarImage,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        setAvatarUrl({
          url: avatarResult.url || "",
          thumbnailUrl: avatarResult.thumbnailUrl || "",
        });
        console.log("Avatar uploaded:", avatarResult.url);
      }

      if (coverFile && coverCroppedAreaPixels) {
        const croppedCoverImage = await getCroppedImg(
          coverPreview,
          coverCroppedAreaPixels
        );
        const coverResult = await edgestore.myPublicImage.upload({
          file: croppedCoverImage,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        setCoverUrl({
          url: coverResult.url || "",
          thumbnailUrl: coverResult.thumbnailUrl || "",
        });
        console.log("Cover uploaded:", coverResult.url);
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onAvatarCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setAvatarCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onCoverCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCoverCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Upload Avatar & Cover
      </h1>

      {/* Avatar Upload */}
      <div className="w-full mb-8">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Avatar
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4  text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>
        {avatarPreview && (
          <div className="relative w-full h-64 mt-4 mb-4">
            <Cropper
              image={avatarPreview}
              crop={avatarCrop}
              zoom={avatarZoom}
              aspect={1}
              onCropChange={setAvatarCrop}
              onZoomChange={setAvatarZoom}
              onCropComplete={onAvatarCropComplete}
            />
          </div>
        )}
      </div>

      {/* Cover Upload */}
      <div className="w-full mb-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Cover
          </label>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                accept="image/*"
                onChange={handleCoverChange}
                type="file"
                className="hidden"
              />
            </label>
          </div>
        </div>
        {coverPreview && (
          <div className="relative w-full h-40 mt-4 mb-4">
            <Cropper
              image={coverPreview}
              crop={coverCrop}
              zoom={coverZoom}
              aspect={16 / 9}
              onCropChange={setCoverCrop}
              onZoomChange={setCoverZoom}
              onCropComplete={onCoverCropComplete}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mb-6"
      >
        Upload
      </button>

      {progress > 0 && (
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          >
            <span className="text-xs text-white font-bold p-1">
              {progress}%
            </span>
          </div>
        </div>
      )}

      {avatarUrl?.url && (
        <div className="flex flex-col items-center mt-6">
          <a
            href={avatarUrl.url}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Uploaded Avatar
          </a>
        </div>
      )}

      {coverUrl?.url && (
        <div className="flex flex-col items-center mt-6">
          <a
            href={coverUrl.url}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Uploaded Cover
          </a>
        </div>
      )}
    </div>
  );
}

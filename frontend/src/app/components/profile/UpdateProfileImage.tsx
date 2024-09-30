"use client";

import { useEdgeStore } from "@/lib/edgeStore";
import React, { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API } from "@/lib/Api";
import { useRouter } from 'next/navigation';

interface FileUrls {
  url: string;
  thumbnailUrl: string;
}

const UpdateAvatar:React.FC = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [avatarUrl, setAvatarUrl] = useState<FileUrls>();
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const [avatarCrop, setAvatarCrop] = useState({ x: 0, y: 0 });
  const [avatarZoom, setAvatarZoom] = useState(1);
  const [avatarCroppedAreaPixels, setAvatarCroppedAreaPixels] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const uploadUrlToDatabase = async () => {
      if (avatarUrl) {
        try {
          const result = await axios.put(`${API}/profile/create`, {
            Id: session?.user?.id,
            avatarUrl: avatarUrl?.url,
          });
          if (result.status === 200) router.push('/profile');
          console.log("URL uploaded to database:", { avatarUrl });
        } catch (error) {
          console.error("Error uploading URL to database:", error);
        }
      }
    };

    uploadUrlToDatabase();
  }, [avatarUrl]);

  const handleUpload = async () => {
    const confirmed = confirm("Are you sure you want to upload?");
    if (confirmed && avatarFile && avatarCroppedAreaPixels) {
      const croppedAvatarImage = await getCroppedImg(avatarPreview, avatarCroppedAreaPixels);
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
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onAvatarCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setAvatarCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg max-w-lg w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Upload Avatar</h1>
        <div className="w-full mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
        <button onClick={handleUpload} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mb-6">
          Upload
        </button>
        {progress > 0 && (
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}>
              <span className="text-xs text-white font-bold p-1">{progress}%</span>
            </div>
          </div>
        )}
        {avatarUrl?.url && (
          <div className="flex flex-col items-center mt-6">
            <a href={avatarUrl.url} className="text-blue-600 dark:text-blue-400 hover:underline">View Uploaded Avatar</a>
          </div>
        )}
      </div>
    </div>
  );
}

export function UpdateCover() {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [coverUrl, setCoverUrl] = useState<FileUrls>();
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const [coverCrop, setCoverCrop] = useState({ x: 0, y: 0 });
  const [coverZoom, setCoverZoom] = useState(1);
  const [coverCroppedAreaPixels, setCoverCroppedAreaPixels] = useState<any>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    const uploadUrlToDatabase = async () => {
      if (coverUrl) {
        try {
          const result = await axios.put(`${API}/profile/create`, {
            Id: session?.user?.id,
            coverUrl: coverUrl?.url,
          });
          if(result.status === 200) router.push('/profile')
          console.log("URL uploaded to database:", { coverUrl });
        } catch (error) {
          console.error("Error uploading URL to database:", error);
        }
      }
    };

    uploadUrlToDatabase();
  }, [coverUrl]);

  const handleUpload = async () => {
    const confirmed = confirm("Are you sure you want to upload?");
    if (confirmed && coverFile && coverCroppedAreaPixels) {
      const croppedCoverImage = await getCroppedImg(coverPreview, coverCroppedAreaPixels);
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
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onCoverCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCoverCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Upload Cover</h1>
      <div className="w-full mb-8">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Cover</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* SVG Icon */}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input accept="image/*" onChange={handleCoverChange} type="file" className="hidden" />
          </label>
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
      <button onClick={handleUpload} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mb-6">
        Upload
      </button>
      {progress > 0 && (
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}>
            <span className="text-xs text-white font-bold p-1">{progress}%</span>
          </div>
        </div>
      )}
      {coverUrl?.url && (
        <div className="flex flex-col items-center mt-6">
          <a href={coverUrl.url} className="text-blue-600 dark:text-blue-400 hover:underline">View Uploaded Cover</a>
        </div>
      )}
    </div>
  );
}

export default UpdateAvatar;
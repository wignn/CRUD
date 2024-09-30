import Link from 'next/link';
import { FC } from 'react';
import { FaUserFriends, FaEnvelope,  } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

interface PhotoCardProps {
  id: number;
  name: string;
  photoURL: string;
  coverURL: string;
}

const PhotoCard: FC<PhotoCardProps> = ({ id, name, photoURL, coverURL }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-black bg-opacity-40 backdrop-blur-lg backdrop-filter text-gray-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="h-64 ">
          <img
            src={coverURL}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex justify-center -mt-16">
          <img
            src={photoURL}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="text-center px-4 pt-16 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">User ID: {id}</p>

          <div className="flex justify-center mt-4 space-x-3">
            <Link href={"/profile/setting"}>
            <button className="bg-gray-200 text-gray-700 flex items-center text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition-colors">
              <IoSettingsOutline className="mr-2" /> Message
            </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;

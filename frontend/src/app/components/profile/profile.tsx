"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import {API} from '@/lib/Api'

interface PhotoCardProps {
    id: number;
    name: string;
    photoURL: string;
    coverURL: string;
    email: string;
    bio: string;
    profile: { avatar: string; sampul: string }[];

  }
const Profile:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<PhotoCardProps>(); 
    const { data: session } = useSession();

    const toggleProfileDetails = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (session?.user?.id) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${API}/users/${session.user?.id}`);
                    setUser(response.data); 
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } 
            };
            fetchUserData();
        }
    }, [session, API]); 

    return (
        <div className="relative">
            {user && user.profile && user.profile[0]?.avatar && (
                <img
                    src={user.profile[0].avatar} 
                    alt="Profile"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={toggleProfileDetails}
                />
            )}

            {isOpen && user && (
                <div className="bg-black bg-opacity-40 backdrop-filter absolute top-20 right-0 w-44 hadow-lg p-2 rounded-lg z-20">
                    <Link href="/profile">
                    <h3 className="text-lg font-semibold text-center text-white">{user.name || "Nama Pengguna"}</h3>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;

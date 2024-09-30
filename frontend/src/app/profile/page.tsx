"use client";
import { use, useEffect, useState } from "react";
import PhotoCard from "../components/profile/ProfileCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "@/app/components/Loading";
import {API} from '@/lib/Api'
import SetingProfile from "@/app/components/settingProfile";

interface User {
  id: number;
  name: string;
  email: string;
  profile: { avatar: string; sampul: string };
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const result = await axios.get(`${API}/users/${session?.user?.id}`);
          setUser(result.data);
          console.log(result.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [session, API]);

  if (loading) {
    return (
        <Loading />
    );
  }
  return (
    <div
      className=" min-h-screen text-white"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className=" gap-6 w-full h-full">
        {user && (
          <PhotoCard
            key={user.id}
            id={user.id}
            name={user.name}
            photoURL={user.profile.avatar}
            coverURL={user.profile.sampul}
          />
        )}
      </div>
    </div>
  );
}

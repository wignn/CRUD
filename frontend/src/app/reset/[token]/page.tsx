'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/lib/Api";

export default function Reset({ params }:any) {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const router = useRouter(); 

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    
    if (newPassword !== reenterPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    
    try {
      const result = await axios.put(`${API}/password/reset`, { newPassword, token: params.token });
  
      if (result.status === 200) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      } else {
        setErrorMessage(result.data.error || "Failed to update password.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-25 shadow-lg border-2 border-purple-600 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Reset Password
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="relative mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="password"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              New Password
            </label>
            <span
              className="absolute top-2 right-2 cursor-pointer text-blue-600 text-xs"
              onClick={togglePassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="relative mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              onChange={(e) => setReenterPassword(e.target.value)}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="confirm"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-transform duration-300 hover:from-purple-600 hover:to-blue-600"
          >
            Submit
          </button>
          {successMessage && (
            <p className="text-center text-green-600 mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-center text-red-600 mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

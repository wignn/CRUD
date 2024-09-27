"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios'
import {API} from '@/lib/Api'

const InputEmailForm = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
   const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    setTimer(35);

    try {
      console.log(email)
      const result = await axios.post(`${API}/token/email`, {email});
      setSuccessMessage("Email berhasil dikirim!");
      setErrorMessage("");
      console.log(result);
    } catch (error) {
      setErrorMessage("Failed to send email."); 
      setSuccessMessage("");
    }
  };

  return (
    <div>
 
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-md p-8 m-4 bg-white bg-opacity-30 shadow-lg border-2 border-purple-600 rounded-lg z-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Forgot Password
          </h2>
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="relative mb-8">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                  className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
                  disabled={isSending}
                />
                <label className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none">
                  Email
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-transform duration-300 hover:from-purple-600 hover:to-blue-600 ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSending}
              >
                {isSending ? `Please wait ${timer}s` : "Reset Password"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputEmailForm;

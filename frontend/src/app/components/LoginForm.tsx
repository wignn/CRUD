'use client'


import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);
  
    function togglePassword() {
      setShowPassword(!showPassword);
    }
  
    function handleInputChange(event : any) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    }
  
    async function handleSubmit(event:any) {
      event.preventDefault();
      setIsSending(true);
  
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
          callbackUrl: "/",
        });
        if (res?.error) {
          setError("Login failed: " + res.error);
        } else if (res?.ok) {
          const result = formValues.email;
          setStatus("Login successful!");
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
        setError("An error occurred. Please try again.");
      } finally {
        setIsSending(false);
      }
    }
  
    return (
      <div>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-50 text-center mb-8">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-8">
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@exemple.com"
                  className="w-full py-2 px-0 text-gray-50 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
                />
                <label className="absolute top-0 left-0 text-gray-50 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none">
                  Email
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="password"
                  required
                  className="w-full py-2 px-0 text-gray-50 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
                />
                <label className="absolute top-0 left-0 text-gray-50 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none">
                  Password
                </label>
                <span
                  className="absolute top-2 right-2 cursor-pointer text-blue-600 text-xs"
                  onClick={togglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <button
                disabled={isSending}
                type="submit"
                className={`w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-transform duration-300 hover:from-purple-600 hover:to-blue-600 ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSending ? "Submitting..." : "Submit"}
              </button>
              {status && (
                <p className="mt-4 text-center text-green-500">{status}</p>
              )}
  
              {error && (
                <div className="text-center mt-4">
                  <p className="text-red-600">{error}</p>
                  <p className="mt-2">
                    <Link
                      href="/reset-password"
                      className="text-blue-600 hover:text-purple-600"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              )}
              <p className="text-center mt-5">
                Don't have an account?{" "}
                <Link
                  href="/Register"
                  className="text-blue-600 hover:text-purple-600"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );

}
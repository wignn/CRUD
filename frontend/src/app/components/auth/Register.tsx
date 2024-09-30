"use client";
import React, { useState } from "react";
import axios from "axios";
import { API } from "@/lib/Api";

const Register:React.FC =()=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/users/create`, formData);
      setMessage("Registration successful!");
      window.location.href = "/Login";
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage("Registration failed!");
      console.error("Error registering user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-transparent-button hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Register
          </button>
        </form>
        <a href="Login">Hava acount click here</a>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;

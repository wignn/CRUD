"use client";
import { useState } from "react";
import axios from "axios";
import { API } from "@/lib/Api";

interface Email {
  fromName: string;
  fromEmail: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<Email>({
    fromName: "",
    fromEmail: "",
    subject: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [button, setButton] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/mail`, formData);
      setResponseMessage("Email sent successfully!"); 
      console.log("Email sent successfully:", response.data);
      setFormData({ fromName: "", fromEmail: "", subject: "", message: "" }); 
    } catch (err) {
      setResponseMessage("Error sending email. Please try again later."); 
      console.error("Error sending email:", err);
    } finally {
      setButton(false);
    }
  };

  return (

    <section id="contact" className="py-20 mx-2 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-white">Contact Us</h2>
        <p className="text-lg text-gray-200 mb-10">
          Have questions? Reach out to us through our social media channels or
          fill out the form below.
        </p>
        <div className="md:max-w-2xl max-w-md mx-auto bg-black bg-opacity-40 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="fromName"
                className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                value={formData.fromName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="fromEmail"
                className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                value={formData.fromEmail}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="subject"
                className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              disabled={button}
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {responseMessage && (
            <div className="mt-4 text-lg font-semibold text-white">
              {responseMessage}
            </div>
          )}
        </div>
        <div className="mt-12">
          <p className="text-lg text-gray-200 mb-4">
            Or find us on social media
          </p>
          <div className="flex justify-center space-x-6">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.325v21.351C0 23.403.598 24 1.325 24h11.482v-9.294H9.578v-3.622h3.229V8.413c0-3.195 1.95-4.937 4.796-4.937 1.366 0 2.541.101 2.881.147v3.341h-1.978c-1.551 0-1.852.738-1.852 1.82v2.385h3.704l-.482 3.622h-3.222V24h6.311C23.403 24 24 23.403 24 22.675V1.325C24 .598 23.403 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.933 4.933 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195A4.92 4.92 0 0016.616 3a4.924 4.924 0 00-4.916 4.917c0 .385.045.761.127 1.124A13.978 13.978 0 011.671 3.149a4.904 4.904 0 00-.666 2.475c0 1.71.87 3.216 2.191 4.1A4.904 4.904 0 01.964 9.62v.061a4.917 4.917 0 003.947 4.827 4.924 4.924 0 01-2.212.084 4.928 4.928 0 004.604 3.42A9.867 9.867 0 010 21.542a13.951 13.951 0 007.548 2.212c9.056 0 14.009-7.507 14.009-14.009 0-.213-.005-.425-.014-.637A9.986 9.986 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.983 3.5c0 1.381-1.12 2.5-2.502 2.5C1.119 6 0 4.881 0 3.5 0 2.12 1.119 1 2.481 1s2.502 1.12 2.502 2.5zM.317 24h4.332V7.896H.317V24zM7.145 7.896v16.104h4.331V15.42c0-1.844.368-3.251 2.392-3.251 2.001 0 2.019 1.97 2.019 3.352v8.479h4.333V14.686c0-4.647-2.481-6.8-5.787-6.8-2.6 0-3.748 1.448-4.382 2.467h.063V7.896H7.145z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

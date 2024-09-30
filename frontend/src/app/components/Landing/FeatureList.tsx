"use client"; // Tambahkan use client di sini jika menggunakan useSession

import React from "react";
import { useSession } from "next-auth/react";

interface Feature {
  title: string;
  href: string;
  description: string;
}

interface FeatureListProps {
  className: string;
  features: Feature[]; 
}

const FeatureList: React.FC<FeatureListProps> = ({ className, features }) => {
  const { data: session } = useSession();

  return (
    <div className={`w-full px-4 ${className}`}>
      <h2 className="md:text-3xl text-base font-bold text-center mb-6 text-gray-200">
        Our Features
      </h2>

      <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
        {features.slice(0, 4).map((feature, idx) => (
          <a
            key={idx}
            href={feature.href}
            className="p-6 mb-6 bg-opacity-40 backdrop-blur-lg backdrop-filter bg-zinc-900 md:w-auto w-40 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-xl text-sm font-semibold mb-2 text-gray-400">
              {feature.title}
            </h3>
            <p className="text-gray-600 md:text-base text-sm">
              {feature.description}
            </p>
          </a>
        ))}
      </div>

      {session?.user?.name === "admin" && (
        <div className="flex justify-center mt-8">
          <a
            href={features[4].href}
            className="p-6 bg-zinc-900 md:w-auto w-40 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-xl text-sm font-semibold mb-2 text-gray-400">
              {features[4].title}
            </h3>
            <p className="text-gray-600 md:text-base text-sm">
              {features[4].description}
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default FeatureList;

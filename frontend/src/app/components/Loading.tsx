import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 border-t-4 border-b-4 border-teal-400 rounded-full animate-spin"></div>
        <p className="text-teal-400 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

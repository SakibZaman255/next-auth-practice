'use client'
import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      {/* 404 Heading with subtle glitch animation */}
      <h1 className="text-9xl font-extrabold text-gray-200 glitch">404</h1>

      {/* Error Message */}
      <h2 className="text-4xl font-semibold mt-4 text-gray-300">Page Not Found</h2>
      <p className="text-lg text-gray-400 mt-2 text-center max-w-lg">
        The page you are looking for might have been moved, renamed, or does not exist.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;

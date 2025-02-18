"use client";
import React, { useEffect, useState } from "react";

const NoInternetPage = () => {
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const handleJump = (event: KeyboardEvent): void => {
      if (event.key === " " || event.key === "ArrowUp") {
        setJump(true);
        setTimeout(() => setJump(false), 500); // Dino jumps for 0.5s
      }
    };
    window.addEventListener("keydown", handleJump);
    return () => window.removeEventListener("keydown", handleJump);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">No Internet</h1>
      <p className="text-gray-400">Check your connection and try again.</p>

      {/* Game Container */}
      <div className="relative w-80 h-32 mt-10 border-t border-gray-500 overflow-hidden">
        {/* Dino */}
        <div
          className={`absolute left-10 bottom-0 w-10 h-10 bg-white rounded-sm animate-dinoRun ${
            jump ? "animate-dinoJump" : ""
          }`}
        >
          🦖
        </div>

        {/* Cactus Obstacles */}
        <div className="absolute right-0 bottom-0 w-6 h-12 bg-green-500 animate-cactusMove"></div>
        <div className="absolute right-10 bottom-0 w-6 h-16 bg-green-600 animate-cactusMove delay-500"></div>
      </div>
    </div>
  );
};

export default NoInternetPage;

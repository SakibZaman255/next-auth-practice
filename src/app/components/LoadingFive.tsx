import React from "react";

const LoadingFive = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black dark:bg-white">
      <div className="flex space-x-2">
        <div className="w-2 h-8 bg-blue-500 animate-fill"></div>
        <div className="w-2 h-8 bg-blue-500 animate-fill200"></div>
        <div className="w-2 h-8 bg-blue-500 animate-fill400"></div>
      </div>
    </div>
  );
};

export default LoadingFive;

import React from "react";

const LoadingTwo = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black dark:bg-white">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce200"></div>
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
};

export default LoadingTwo;

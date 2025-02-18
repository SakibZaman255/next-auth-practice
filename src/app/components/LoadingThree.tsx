import React from "react";

const LoadingThree = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black dark:bg-white">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingThree;

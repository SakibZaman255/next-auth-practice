import React from "react";

const ServerErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-red-900 text-white">
      <h1 className="text-7xl font-bold animate-shake">500</h1>
      <p className="text-xl mt-2">Something went wrong! Please try again later.</p>
    </div>
  );
};

export default ServerErrorPage;

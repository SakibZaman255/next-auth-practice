import React from "react";

const MaintenancePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="flex items-center space-x-3">
        <span className="text-6xl animate-flicker">💡</span>
        <h1 className="text-5xl font-bold animate-fade">Under Maintenance</h1>
      </div>
      <p className="mt-2 text-gray-400">We’ll be back soon!</p>
    </div>
  );
};

export default MaintenancePage;

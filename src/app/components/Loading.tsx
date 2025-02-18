import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black dark:bg-white">
      <h1 className="relative w-full xl:text-9xl md:text-8xl text-5xl sm:tracking-[17px] tracking-[10px] uppercase text-center leading-[0.70em] outline-none animate-lightglow box-reflect">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;

import React from "react";
import { Parallax } from "react-parallax";

const Banner = () => {
  return (
    <Parallax
      bgImage="../../public/background.jpg"
      bgImageAlt="background"
      strength={500}
      style={{
        height: "100vh",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 0% 95%)",
      }}
    >
      <div className="h-[100vh] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-4xl font-bold">Ideas</h1>
          <p className="text-white text-lg">Where all our great things begin</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Banner;

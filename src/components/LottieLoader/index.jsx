import React from 'react';
import "./Loader.css";

const LottieLoader = () => {

  return (
    <div className="loader-container">
      <div className="loader border-t-2 rounded-full border-blue-900 bg-gray-200 animate-spin aspect-square w-10 h-10 flex justify-center items-center"></div>
    </div>
  );
};

export default LottieLoader;

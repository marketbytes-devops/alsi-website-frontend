import React from "react";
import LRBg from "../../assets/images/Industries/lr-bg.webp";

const FirstLayout = ({ imageUrl, title, description }) => {
  return (
    <div className="flex flex-col mb-10 md:flex-row">
      <div className="w-full md:w-1/2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-fill"
        />
      </div>
      <div
        className="w-full md:w-1/2 flex items-center justify-center"
        style={{
          background: `url(${LRBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "2rem",
        }}
      >
        <div className="text-left mx-4 md:mx-20 my-6 md:my-12">
          <div
            className="font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstLayout;

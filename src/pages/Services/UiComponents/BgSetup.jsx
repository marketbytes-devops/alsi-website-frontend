import React from "react";
import backgroundImage from "../../../assets/images/Services/service-main-bg.webp";

const BgSetup = ({ count }) => {
  const bgSetups = Array.from({ length: count }, (_, index) => (
    <div className="bg-white pt-32 w-full h-auto relative top-12" key={index}>
      <div
        className="flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "fill",
          width: "100%",
          height: "450px",
        }}
      ></div>
      <div className="pb-44"></div>
    </div>
  ));

  return <>{bgSetups}</>;
};

export default BgSetup;

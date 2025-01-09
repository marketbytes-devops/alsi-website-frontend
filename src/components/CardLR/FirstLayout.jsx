import React from "react";
import LRBg from "../../assets/images/Industries/lr-bg.webp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FirstLayout = ({ imageUrl, title, description, showLink, link_url }) => {
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
          {showLink && (
            <div className="flex items-center justify-start pt-4">
            <Link to={link_url} className="flex items-center">
              Read More <FontAwesomeIcon icon={faArrowRight} size="md" className="text-[#2044a2] bg-white hover:bg-[#2044a2] hover:text-[white] px-[11px] py-[10px] ml-4 rounded-full transition-all duration-300" />
            </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstLayout;

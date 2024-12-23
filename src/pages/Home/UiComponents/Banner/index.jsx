import React, { useState, useEffect } from "react";
import apiClient from "../../../../api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("/home/banner/")
      .then((response) => {
        setBannerData(response.data[0]);
      })
      .catch((error) => {
        console.error(
          "Error fetching banner data",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  if (!bannerData) {
    return <p>Loading...</p>;
  }

  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  return (
    <>
      <div className="hidden md:flex flex-col-reverse md:flex-row items-center md:items-start relative md:top-36 h-screen">
        <div className="z-40 md:w-[60%] w-full flex flex-col items-center md:items-start text-center md:text-left px-4 pt-4 md:px-20 md:pt-8">
          <h1
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: bannerData.title }}
            style={{ lineHeight: "95px" }}
          />
          <h6
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: bannerData.subtitle }}
          />
          <p
            className="mb-6 w-[65%]"
            dangerouslySetInnerHTML={{ __html: bannerData.description }}
          />
          <div className="flex items-center justify-center md:justify-start">
            <Link
              to={removeHtmlTags(bannerData.link_url)}
              className="text-black text-sm font-medium mr-3 flex items-center"
            >
              {removeHtmlTags(bannerData.link_name)}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 rounded-full px-[10px] py-[10px] text-white bg-[#2044a2] hover:text-[#2044a2] hover:bg-white transform transition-all"
              />
            </Link>
          </div>
        </div>
        <div className="absolute right-4 -top-28 z-20">
          <img
              src={bannerData.image}
            className="md:w-[100%] h-[625px] object-cover"
            alt={removeHtmlTags(bannerData.title)}
          />
        </div>
      </div>

      <div className="md:hidden relative mt-32 h-screen md:h-auto flex flex-col items-center text-center md:flex-row md:text-left overflow-hidden">
        <div className="relative w-full md:w-[40%] h-96 md:h-auto mb-6 md:mb-0">
          <img
              src={bannerData.image}
            className="w-full h-full object-cover"
            alt={bannerData.title}
          />
        </div>
        <div className="z-40 w-full md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-[4%]">
          <h1
            className="mb-3 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: bannerData.title }}
          />
          <h6
            className="mb-6 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: bannerData.subtitle }}
          />
          <p
            className="mb-6 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: bannerData.description }}
          />
          <div className="flex justify-center md:justify-start">
            <Link
              to={removeHtmlTags(bannerData.link_url)}
              className="text-black text-sm font-medium flex items-center"
            >
              {removeHtmlTags(bannerData.link_name)}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 rounded-full px-[10px] py-[10px] text-white bg-[#2044a2] hover:text-[#2044a2] hover:bg-white transform transition-all"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

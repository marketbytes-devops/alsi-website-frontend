import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../api";
import Title from "../../Title";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LottieLoader from "../../LottieLoader";

const Industries = () => {
  const [title, setTitle] = useState("");
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTitleAndIndustries = async () => {
      try {
        const titleResponse = await apiClient.get("home/industry/");
        const titleData = titleResponse.data;

        if (titleData && titleData.length > 0) {
          setTitle(titleData[0].title);
        } else {
          setTitle("<p>No Industries Available</p>");
        }

        const industriesResponse = await apiClient.get("home/industry-entries/");
        const industriesData = industriesResponse.data;

        if (industriesData.length > 0) {
          setIndustries(industriesData);
        } else {
          setIndustries([]);
        }
      } catch (err) {
        setError("Failed to load industries data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitleAndIndustries();
  }, []);

  const slickSettings = {
    arrows: true, 
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
  };

  return (
    <>
      <div className="text-center pb-2 sm:pb-4 md:pb-0 lg:pb-0">
        <Title title={title} />
      </div>

      {isLoading ? (
        <div className="text-center"><LottieLoader/></div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : industries.length === 0 ? (
        <div className="text-center">No industries available</div>
      ) : (
        <div className="relative lg:px-[130px] md:px-[130px] sm:px-4">
          <Slider ref={sliderRef} {...slickSettings}>
            {industries.map((entry, index) => (
              <div key={`${entry.id}-${index}`}>
                <Link to={entry.path_name}>
                  <div className="relative px-2 flex flex-col items-center justify-center bg-white text-center h-[680px] sm:h-[680px] md:lg:h-[700px] lg:h-[700px] overflow-hidden">
                    <div className="absolute top-5 px-6 sm:px-6 lg:px-2">
                      <div className="flex items-center mb-2 sm:mb-4 md:mb-4">
                        <div
                          dangerouslySetInnerHTML={{ __html: entry.title }}
                          className="text-left text-2xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#212529] mr-3"
                        />
                        <div className="flex-1 h-[4px] bg-[#00008E] w-auto rounded"></div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{ __html: entry.description }}
                        className="text-left text-[#212529] sm:text-sm md:text-base lg:text-lg"
                      />
                    </div>
                    <div className="relative bottom-0 flex flex-col items-center justify-center w-full md:w-full lg:w-full">
                      <div className="absolute -top-20 sm:-top-20 lg:top-10 flex flex-col items-center justify-center w-full">
                        <img
                          src={entry.image}
                          className="w-full mt-4 md:mt-0 px-4 md:px-0 h-[380px] md:h-[300px] lg:h-[300px] xl:h-[300px] object-cover bg-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-md"
                          alt={entry.title}
                        />
                      </div>
                      <div className="absolute -top-[75px] right-2 sm:-top-[75px] sm:right-2 md:top-8 md:-right-3 lg:top-8 lg:-right-3 bg-gray-50 shadow-sm shadow-gray-700 w-14 h-12 flex justify-center items-center">
                        <p className="lg:text-lg md:text-lg sm:text-sm">
                          {entry.entry_number}{"."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center space-x-4 pt-10">
            <button
              className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
              onClick={() => sliderRef.current.slickPrev()}  
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
              onClick={() => sliderRef.current.slickNext()}  
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Industries;

import React, { useEffect, useState, useRef } from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../api";
import Title from "../../Title";

const Industries = () => {
  const [title, setTitle] = useState("");
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  useEffect(() => {
    if (industries.length > 0) {
      const swiper = document.querySelector(".swiper")?.swiper;
      if (swiper) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [industries]);

  return (
    <>
      <div className="text-center pb-2 sm:pb-2 md:pb-2 lg:pb-4">
        <Title title={title} />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : industries.length === 0 ? (
        <div className="text-center">No industries available</div>
      ) : (
        <div className="relative lg:px-[130px] md:px-[130px] sm:px-4">
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={false}
            autoplay={{ delay: 3000 }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            onSlideChange={() => console.log("slide change")}
          >
            {industries.map((entry, index) => (
              <SwiperSlide key={`${entry.id}-${index}`}>
                <Link to={entry.path_name}>
                  <div className="relative px-2 flex flex-col items-center justify-center bg-white text-center h-[550px] sm:h-[550px] lg:h-[660px] overflow-hidden">
                    <div className="absolute top-5 px-6 sm:px-6 lg:px-2">
                      <div className="flex items-center mb-2 sm:mb-2 md:mb-4">
                        <div 
                          dangerouslySetInnerHTML={{ __html: entry.title }}
                          className="text-left text-2xl font-semibold text-[#212529] mr-3"
                        />
                        <div className="flex-1 h-[4px] bg-[#00008E] w-auto rounded"></div>
                      </div>

                      <div 
                        dangerouslySetInnerHTML={{ __html: entry.description }}
                        className="text-left text-[#212529]"
                      />
                    </div>
                    <div className="relative bottom-0 flex flex-col items-center justify-center w-[370px] sm:w-[370px] md:w-full lg:w-full">
                      <div className="absolute top-0 flex flex-col items-center justify-center w-full">
                        <img
                          src={entry.image}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-md"
                          alt={entry.title}
                        />
                      </div>
                      <div className="absolute top-4 -right-3 sm:-top-4 sm:-right-3 md:-top-2 md:-right-2 lg:-top-2 lg:-right-3 bg-gray-50 shadow-sm shadow-gray-700 w-14 h-12 flex justify-center items-center">
                        <p className="lg:text-lg md:text-lg sm:text-sm">
                          {entry.entry_number}{"."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center mt-4 space-x-4 pt-8">
            <button
              className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
              ref={prevRef}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
              ref={nextRef}
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
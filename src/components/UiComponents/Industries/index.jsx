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
    const fetchIndustriesData = async () => {
      try {
        const response = await apiClient.get("home/industries/");
        const industriesData = response.data;

        if (industriesData.length > 0) {
          setTitle(industriesData[0].title || "Industries");
          setIndustries(industriesData);
        } else {
          setTitle("<p>No Industries Available</p>");
        }
      } catch (err) {
        setError("Failed to load industries data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustriesData();
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
        <div className="relative lg:px-36 md:px-36 sm:px-4">
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
            {industries.map((industry) =>
              industry.entries && industry.entries.length > 0 ? (
                industry.entries.map((entry, index) => (
                  <SwiperSlide key={`${industry.id}-${index}`}>
                    <Link to={entry.link}>
                      <div className="relative flex flex-col items-center justify-center px-4 bg-white text-center h-[550px] sm:h-[550px] lg:h-[590px] overflow-hidden">
                        <div className="absolute top-5 px-6 sm:px-6 lg:px-0">
                          <div className="flex items-center mb-2">
                            <h3 className="text-left text-2xl font-semibold text-black mr-4">
                              {entry.title}
                            </h3>
                            <div className="flex-1 h-[4px] bg-[#00008E] rounded"></div>
                          </div>

                          <p className="text-left text-black">
                            {entry.description}
                          </p>
                        </div>
                        <div className="absolute bottom-0 flex flex-col items-center justify-center w-[370px] sm:w-[370px] md:w-[370px] lg:w-full">
                          <div className="relative flex flex-col items-center justify-center w-full">
                            <img
                              src={entry.image}
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                              alt={entry.title}
                            />
                          </div>
                          <div className="absolute -top-4 -right-3 sm:-top-4 sm:-right-3 md:-top-2 md:-right-2 lg:-top-2 lg:-right-2 bg-gray-50 shadow-lg shadow-gray-500 py-2 px-3">
                            <p className="lg:text-lg md:text-lg sm:text-sm">
                              {entry.no}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <div key={industry.id} className="text-center text-gray-500">
                  No entries available
                </div>
              )
            )}
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

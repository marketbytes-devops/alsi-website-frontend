import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../../../api";

const Highlights = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [title, setTitle] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTitleAndHighlights = async () => {
      try {
        const titleResponse = await apiClient.get("home/highlight/"); 
        const titleData = titleResponse.data;

        if (titleData && titleData.length > 0) {
          setTitle(titleData[0].title);
        } else {
          setTitle("No Highlights Available");
        }

        const highlightsResponse = await apiClient.get("home/highlight-entries/"); 
        const highlightsData = highlightsResponse.data;

        if (highlightsData.length > 0) {
          setHighlights(highlightsData);
        } else {
          setHighlights([]);
        }
      } catch (err) {
        setError("Failed to load highlights. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitleAndHighlights();
  }, []);

  useEffect(() => {
    const swiper = document.querySelector(".swiper").swiper;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <div
      className="mx-auto"
      style={{ background: "rgb(18, 81, 148)", width: "100%", height: "auto" }}
    >
      {isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="md:flex hidden sm:hidden">
            <div className="relative left-36 top-36 p-4">
              <div dangerouslySetInnerHTML={{ __html: title }} className="text-white text-4xl font-bold" />
            </div>
            <div className="flex justify-left flex-wrap py-20">
              <div className="card w-[350px] h-[350px]"></div>
              {highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="card w-[350px] h-[350px] bg-[linear-gradient(0deg,#193377,#009adb)] border border-gray-300 flex items-center justify-center hover:scale-[1.02] transition duration-300"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "3px solid white",
                        borderRadius: "50%",
                        background: "transparent",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} size="lg" className="text-white" />
                    </div>
                    <div className="text-white text-lg font-extrabold mt-4" dangerouslySetInnerHTML={{ __html: highlight.highlight_title }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="block sm:block md:hidden py-6">
            <div className="text-center pb-6">
              <div dangerouslySetInnerHTML={{ __html: title }} className="text-white text-4xl font-bold" />
            </div>
            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
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
            >
              {highlights.map((highlight) => (
                <SwiperSlide key={highlight.id}>
                  <div className="mx-4 card w-auto h-[300px] bg-[linear-gradient(0deg,#193377,#009adb)] border border-gray-300 flex flex-col items-center justify-center hover:scale-[1.02] transition duration-300">
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "3px solid white",
                        borderRadius: "50%",
                        background: "transparent",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} size="lg" className="text-white" />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: highlight.highlight_title }} className="text-white text-lg font-bold mt-4"/>
                  </div>
                </SwiperSlide>
              ))}
              <div className="flex justify-center mt-4 space-x-4 pt-4">
                <button
                  className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
                >
                  <FontAwesomeIcon icon={faArrowLeft} ref={prevRef} />
                </button>
                <button
                  className="bg-gray-100 hover:bg-[#2044a2] hover:text-white hover:border-none transform transition-transform border-2 border-gray-300 text-gray-800 w-10 h-10 rounded-full"
                >
                  <FontAwesomeIcon icon={faArrowRight} ref={nextRef} />
                </button>
              </div>
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Highlights;

import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../../../api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Highlights = () => {
  const [title, setTitle] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const sliderRef = useRef(null);

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

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
            <div className="flex justify-end flex-wrap py-20 pr-20">
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
                    <div className="text-white text-lg font-extrabold mt-4" dangerouslySetInnerHTML={{ __html: highlight.highlight_title }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="block sm:block md:hidden lg:hidden xl:hidden py-6">
            <div className="text-center pb-6">
              <div dangerouslySetInnerHTML={{ __html: title }} className="text-white text-4xl font-bold" />
            </div>
            <Slider {...slickSettings} ref={sliderRef}>
              {highlights.map((highlight) => (
                <div key={highlight.id}>
                  <div className="mx-8 card w-auto h-[300px] bg-[linear-gradient(0deg,#193377,#009adb)] border border-gray-300 flex flex-col items-center justify-center hover:scale-[1.02] transition duration-300">
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
                    <div dangerouslySetInnerHTML={{ __html: highlight.highlight_title }} className="text-center text-white text-lg font-bold mt-4" />
                  </div>
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
        </>
      )}
    </div>
  );
};

export default Highlights;

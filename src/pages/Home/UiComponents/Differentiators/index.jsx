import React, { useRef, useEffect, useState } from 'react';
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../api"; 
import Title from '../../../../components/Title';

const Differentiators = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [differentiators, setDifferentiators] = useState([]);
  const [isLoading, setIsLoading] = useState({ title: true, entries: true });
  const [error, setError] = useState({ title: null, entries: null });

  useEffect(() => {
    const fetchTitleAndSubtitle = async () => {
      try {
        const response = await apiClient.get("home/differentiator/");
        const data = response.data;
        if (data.length > 0) {
          setTitle(data[0].title);
          setSubtitle(data[0].subtitle);
        } else {
          setTitle("No Differentiators Available");
        }
      } catch (err) {
        setError(prev => ({ ...prev, title: "Failed to load title and subtitle. Please try again." }));
      } finally {
        setIsLoading(prev => ({ ...prev, title: false }));
      }
    };

    fetchTitleAndSubtitle();
  }, []);

  useEffect(() => {
    const fetchDifferentiatorEntries = async () => {
      try {
        const response = await apiClient.get("home/differentiator-entries/");
        setDifferentiators(response.data || []);
      } catch (err) {
        setError(prev => ({ ...prev, entries: "Failed to load differentiator entries. Please try again." }));
      } finally {
        setIsLoading(prev => ({ ...prev, entries: false }));
      }
    };

    fetchDifferentiatorEntries();
  }, []);

  useEffect(() => {
    const swiper = document.querySelector(".swiper")?.swiper;
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [differentiators]);

  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  return (
    <>
      <div className='text-center px-8 md:px-44 sm:px-8'>
        {isLoading.title ? (
          <div>Loading title...</div>
        ) : error.title ? (
          <div className="text-red-500">{error.title}</div>
        ) : (
          <Title title={title} subtitle={subtitle} />
        )}
      </div>

      {isLoading.entries ? (
        <div className="text-center">Loading entries...</div>
      ) : error.entries ? (
        <div className="text-center text-red-500">{error.entries}</div>
      ) : differentiators.length === 0 ? (
        <div className="text-center">No differentiators available</div>
      ) : (
        <>
          <div className='block sm:hidden'>
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
              className='my-6'
            >
              {differentiators.map((entry) => (
                <SwiperSlide key={entry.id} className='flex flex-col items-center'>
                  <div 
                    className='rounded-full p-16 mt-4' 
                    style={{background: "radial-gradient(at left, #1d346e, #027eb4)"}}
                  >
                    <img 
                      src={entry.image} 
                      alt={removeHtmlTags(entry.differentiator_title)} 
                      className='w-10 h-10 object-contain' 
                    />
                  </div>
                  <div className='mt-4 text-[16px] uppercase font-bold' dangerouslySetInnerHTML={{ __html: entry.differentiator_title }} />
                </SwiperSlide>
              ))}
              <div className="flex justify-center mt-4 space-x-4 pt-8">
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

          <div className='hidden sm:flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center my-6'>
            {differentiators.map((entry) => (
              <div 
                key={entry.id} 
                className='flex flex-col items-center justify-center px-20 mt-8'
              >
                <div 
                  className='rounded-full p-8' 
                  style={{background: "radial-gradient(at left, #1d346e, #027eb4)"}}
                >
                  <img 
                    src={entry.image} 
                    alt={removeHtmlTags(entry.differentiator_title)} 
                    className='w-10 h-10 object-contain' 
                  />
                </div>
                <div className='mt-4 text-[16px] uppercase font-bold' dangerouslySetInnerHTML={{ __html: entry.differentiator_title }} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Differentiators;

import React, { useRef, useEffect, useState } from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Title from "../../Title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import apiClient from "../../../api";

const Services = ({ title }) => {
  const [servicesData, setServicesData] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await apiClient.get("service/services/");
        const formattedData = response.data.map(service => ({
          id: service.id,
          link: `/services/${service.id}`,
          image: service.entries[0]?.image || '',
          title: service.entries[0]?.title || '',
          subtitle: service.entries[0]?.subtitle || '',
        }));
        setServicesData(formattedData);
      } catch (error) {
        console.error("Failed to fetch services data:", error);
      }
    };

    fetchServicesData();
  }, []);

  useEffect(() => {
    if (servicesData.length === 0) return;

    const swiper = document.querySelector(".swiper").swiper;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, [servicesData]);

  return (
    <>
      <div className="text-center mb-4 sm:mb-4 md:mb-8">
        <Title title={title || "Our Services"} />
      </div>
      <div className="relative lg:px-36 md:px-36 sm:px-4">
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
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
          {servicesData.length > 0 ? (
            servicesData.map((service, index) => (
              <SwiperSlide key={index}>
                <Link to={service.link}>
                  <div
                    className="relative p-6 bg-white text-center h-[300px] sm:h-[300px] md:h-[350px] lg:h-[350px] xl:h-[350px]  hover:scale-[1.05] transition-transform duration-500 shadow-xl shadow-gray-300"
                  >
                    <div className="text-6xl flex items-center justify-center mb-4 py-8 relative top-0">
                      <img src={service.image} className="w-16 h-16" alt={service.title} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#193579] relative top-0">
                      {service.title}
                    </h3>
                    <p className="text-[#193579] py-1 relative top-0">
                      {service.subtitle}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>No services available</p>
          )}
        </Swiper>
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
      </div>
    </>
  );
};

Services.propTypes = {
  title: PropTypes.string,
};

export default Services;

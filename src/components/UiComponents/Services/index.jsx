import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Title from "../../Title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import apiClient from "../../../api";

const Services = ({ excludeService, forceTitle }) => {
  const [title, setTitle] = useState(forceTitle || "");
  const [servicesData, setServicesData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!forceTitle) {
      const fetchTitle = async () => {
        try {
          const response = await apiClient.get("service/services-banner/");
          const data = response.data;
          if (data.length > 0) {
            setTitle(data[0].title);
          } else {
            setTitle("Our Services");
          }
        } catch (err) {
          console.error("Failed to load title:", err);
        }
      };
      fetchTitle();
    }
  }, [forceTitle]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await apiClient.get("service/services/");
        const formattedData = response.data.map(service => ({
          id: service.id,
          link: `/services/${service.link_url}`,
          image: service.image || "",
          banner_image: service.banner_image || "",
          title: service.title || "",
          service_title: service.service_title, 
          subtitle: service.subtitle || "",
          content_paragraphs: service.content_paragraphs || "",
          link_url: service.link_url, 
        }));
        const filteredData = formattedData.filter(
          (service) => service.link_url !== excludeService 
        );
        setServicesData(filteredData);
      } catch (error) {
        console.error("Failed to fetch services data:", error);
      }
    };

    fetchServicesData();
  }, [excludeService]);

  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }; 

  return (
    <>
      <div className="text-center mb-4 sm:mb-4 md:mb-8">
        <Title title={title} />
      </div>
      <div className="relative lg:px-36 md:px-36 sm:px-4">
        <Slider
          ref={sliderRef}
          {...sliderSettings}
        >
          {servicesData.length > 0 ? (
            servicesData.map((service, index) => (
              <div key={index}>
                <Link
                  to={service.link}
                  state={{
                    image: service.image,
                    banner_image: service.banner_image,
                    service_title: service.service_title,
                    content_paragraphs: service.content_paragraphs,
                    link_url: service.link_url,
                  }}
                >
                  <div className="relative p-6 bg-white text-center h-[300px] sm:h-[300px] md:h-[350px] lg:h-[350px] xl:h-[350px] hover:scale-[1.05] transition-transform duration-500 shadow-xl shadow-gray-300">
                    <div className="text-6xl flex items-center justify-center mb-4 py-8 relative top-0">
                      <img src={service.image} className="w-16 h-16 object-contain" alt={service.title} />
                    </div>
                    <div
                      className="text-2xl font-bold text-[#193579] relative top-0"
                      dangerouslySetInnerHTML={{ __html: service.title }}
                    />
                    <div
                      className="text-[#6a6d78] py-1 relative top-0"
                      dangerouslySetInnerHTML={{ __html: service.subtitle }}
                    />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </Slider>
        <div className="flex justify-center pt-8 space-x-4">
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
  );
};

Services.propTypes = {
  initialTitle: PropTypes.string,
  excludeService: PropTypes.string,
  forceTitle: PropTypes.string,
};

export default Services;

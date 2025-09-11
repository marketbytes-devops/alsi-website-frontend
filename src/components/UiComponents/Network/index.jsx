import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Title from "../../Title";
import networkBg from "../../../assets/images/Home/GlobalMap.webp";
import UAE from "./Maps/UAE";
import Oman from "./Maps/Oman";
import KSA from "./Maps/KSA";
import Qatar from "./Maps/Qatar";
import apiClient from "../../../api";

const Network = () => {
  const [title_highlight, setTitle] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: "0%", left: "0%" });
  const [networkData, setNetworkData] = useState([]);
  const [isMouseInsideTooltip, setIsMouseInsideTooltip] = useState(false);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const titleResponse = await apiClient.get("network/our-network-banner/");
        if (titleResponse.data.length > 0) {
          setTitle(titleResponse.data[0].title_highlight);
        } else {
          setTitle("No title");
        }
  
        const networkResponse = await apiClient.get("network/our-network/");
        if (networkResponse.data && networkResponse.data.length > 0) {
          setNetworkData(networkResponse.data);
        } else {
          setNetworkData([]);
        }
      } catch (error) {
        // Silently fail, no error handling
      }
    };
  
    fetchNetworkData();
  }, []);  

  const handleMouseEnter = (country) => {
    setHoveredCountry(country);
    setTooltipVisible(true);

    const selectedCountry = networkData.find(data => removeHtmlTags(data.name) === country);
  
    if (selectedCountry) {
      setTooltipPosition({
        top: `${parseFloat(selectedCountry.position_top)}%`, 
        left: `${parseFloat(selectedCountry.position_left)}%`
      });
    }
  };

  const handleMouseLeave = (event) => {
    const tooltip = document.querySelector('.tooltip');
    const isTooltipHovered = tooltip && tooltip.contains(event.relatedTarget);
    if (!isTooltipHovered) {
      setTooltipVisible(false);
      setHoveredCountry(null);
    }
  };

  const removeHtmlTags = (str) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.textContent || "";
  };  

  if (!networkData.length) {
    return <div></div>;
  }

  return (
    <div
      className="relative py-6 text-center"
      style={{
        width: "100%",
        height: "auto",
        background: `url(${networkBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        aspectRatio: "16/6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title title={title_highlight} color="white" />
      <div className="flex items-center justify-center">
        <div className="map-svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1166.776 870.253"
            className="w-[320px] h-auto sm:w-[320px] md:w-[400px] lg:w-[650px] aspect-[1166/870]"
          >
            <g transform="translate(-6088.6 421.048)">
              <g
                transform="translate(6859.722 -104.237)"
                clipPath="url(#a)"
                className="uae"
                fill={hoveredCountry === "UAE" ? "#1890F9" : "#125194"}
                onMouseEnter={() => handleMouseEnter("UAE")}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "fill 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: hoveredCountry === "UAE" ? "drop-shadow(10px 10px 10px #080808)" : "none",
                }}
              >
                <UAE />
              </g>
              <g
                fill={hoveredCountry === "Oman" ? "#1890F9" : "#125194"}
                onMouseEnter={() => handleMouseEnter("Oman")}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "fill 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: hoveredCountry === "Oman" ? "drop-shadow(10px 5px 10px #000000)" : "none",
                }}
              >
                <Oman />
              </g>
              <g
                transform="translate(6088.6 -421.048)"
                clipPath="url(#b)"
                fill={hoveredCountry === "KSA" ? "#1890F9" : "#125194"}
                onMouseEnter={() => handleMouseEnter("KSA")}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "fill 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: hoveredCountry === "KSA" ? "drop-shadow(10px 5px 10px #000000)" : "none",
                }}
              >
                <KSA />
              </g>
              <g
                transform="translate(6818.349 -106.485)"
                clipPath="url(#g)"
                className="focus-outline-none"
                fill={hoveredCountry === "Qatar" ? "#1890F9" : "#125194"}
                onMouseEnter={() => handleMouseEnter("Qatar")}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "fill 0.3s ease-in-out, filter 0.3s ease-in-out",
                  filter: hoveredCountry === "Qatar" ? "drop-shadow(0px 0px 20px #080808)" : "none",
                }}
              >
                <Qatar />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {tooltipVisible && hoveredCountry ? (
        <motion.div
          className="z-30 tooltip bg-white text-[#212529] space-y-2 w-[180px] h-auto sm:w-[180px] md:w-[200px] lg:w-[200px] xl:w-[200px]"
          style={{
            position: "absolute",
            borderRadius: "5px",
            padding: "10px",
            top: tooltipPosition.top,
            left: tooltipPosition.left
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsMouseInsideTooltip(true)}
          onMouseLeave={() => {
            setIsMouseInsideTooltip(false);
            handleMouseLeave();
          }}
        >
          <div className="text-left text-[24px] font-extrabold">
            {removeHtmlTags(hoveredCountry)}
          </div>
          <p className="text-left text-[12px] font-[600]">
            {networkData.find(data => removeHtmlTags(data.name) === hoveredCountry)?.address ? 
              removeHtmlTags(networkData.find(data => removeHtmlTags(data.name) === hoveredCountry)?.address) : null
            }
          </p>
          <div className="flex justify-left items-center">
            <Link to={networkData.find(data => removeHtmlTags(data.name) === hoveredCountry)?.url}>
              <div className="flex items-center justify-start">
                <span className="text-xs font-bold">Learn More</span>
                <span className="ml-2 flex justify-center items-center w-8 h-8 text-white bg-[#2044a2] hover:bg-white hover:text-[#2044a2] hover:border-[#2044a2] hover:border rounded-full transform transition-all">
                  <FontAwesomeIcon icon={faArrowRight} size="xs" />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div
          className="z-30 tooltip w-[180px] h-[100px] sm:w-[180px] md:w-[200px] lg:w-[200px] xl:w-[200px]"
          style={{
            position: "absolute",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            visibility: "hidden"
          }}
        />
      )}
    </div>
  );
};

export default Network;
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
  const [title, setTitle] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: "0%", left: "0%" });
  const [networkData, setNetworkData] = useState([]);
  const [error, setError] = useState("");
  const [isMouseInsideTooltip, setIsMouseInsideTooltip] = useState(false);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const response = await apiClient.get("network/our-network/");
        if (response.data.length > 0) {
          setTitle(response.data[0].title);
          const formattedData = response.data.flatMap(network =>
            network.entries.map(entry => ({
              id: entry.id,
              name: entry.name,
              address: entry.address,
              url: entry.url,
              position: {
                top: `${parseFloat(entry.position_top)}%`,
                left: `${parseFloat(entry.position_left)}%`
              }
            }))
          );
          setNetworkData(formattedData);
        } else {
          setTitle("No Network Available");
        }
      } catch (error) {
        console.error("Failed to fetch networks data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchNetworkData();
  }, []);

  const handleMouseEnter = (country) => {
    setHoveredCountry(country);
    setTooltipVisible(true);
    const selectedCountry = networkData.find(data => data.name === country);
    if (selectedCountry) {
      setTooltipPosition({
        top: selectedCountry.position.top,
        left: selectedCountry.position.left
      });
    } else {
      setTooltipPosition({ top: "35%", left: "40%" });
    }
  };

  const handleMouseLeave = (event) => {
    const tooltip = document.querySelector('.tooltip');
    const isTooltipHovered = tooltip && tooltip.contains(event.relatedTarget);
    if (!isTooltipHovered) {
      setTooltipVisible(false);
      setHoveredCountry(false);
    }
  };

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
        objectFit: "contain",
      }}
    >
      <Title title={title} color="white" />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center justify-center">
        <div class="map-svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1166.776 870.253"
            className="w-[320px] h-auto sm:w-[320px] md:w-[400px] lg:w-[650px]"
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
      
      {tooltipVisible && hoveredCountry && (
        <motion.div
          className="z-30 tooltip bg-white space-y-2 w-[180px] h-auto sm:w-[180px] md:w-[200px] lg:w-[200px] xl:w-[200px]"
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
          <h5 className="text-left text-[24px] font-extrabold">{hoveredCountry}</h5>
          <p className="text-left text-[12px] font-[600]">
            {networkData.find(data => data.name === hoveredCountry)?.address}
          </p>
          <div className="flex justify-left items-center pt-2">
            <Link to={networkData.find(data => data.name === hoveredCountry)?.url}>
            <div className="flex items-center justify-start">
              <span className="text-xs font-bold">Learn More</span>
              <span className="ml-2 flex justify-center items-center w-8 h-8 text-white bg-[#2044a2] hover:bg-white hover:text-[#2044a2] hover:border-[#2044a2] hover:border rounded-full transform transition-all">
                <FontAwesomeIcon icon={faArrowRight} size="xs" />
              </span>
            </div>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Network;

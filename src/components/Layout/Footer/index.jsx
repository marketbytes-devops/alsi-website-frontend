import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/Home/logo.webp";
import apiClient from "../../../api";
import Copyright from "../../Copyright";

const Footer = () => {
  const [footerData, setFooterData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegions = async () => {
    try {
      const response = await apiClient.get("home/footer/");
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setFooterData((prevData) => ({ ...prevData, regions: response.data }));
      } else {
        setError("Invalid API response structure.");
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
      setError("Error fetching regions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  if (loading) {
    return <p>Loading footer data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <footer className="bg-white text-zinc-800">
      <div className="container mx-auto py-4 text-center">
        <img src={Logo} className="mx-auto mb-6 w-24 md:w-28 lg:w-32" alt="ALSI Logo" />
      </div>
      <div className="container mx-auto flex flex-wrap justify-center gap-8 py-6 px-4 sm:px-8 md:px-16">
        {footerData.regions.length > 0 ? (
          footerData.regions.map((region) => (
            <div key={region.id} className="flex-1 min-w-[200px] text-center font-normal">
              <h2 className="text-lg font-bold mb-2">{region.location}</h2>
              {region.company && <p className="mb-1">{region.company}</p>}
              {region.address?.split("\n").map((line, idx) => (
                <p key={idx} className="mb-1">{line}</p>
              ))}
              {region.contact?.split("\n").map((phone, idx) => (
                <p key={idx} className="mb-1">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                </p>
              ))}
              {region.email && (
                <p className="mb-1">
                  <a href={`mailto:${region.email}`}>{region.email}</a>
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No footer data available.</p>
        )}
      </div>
      <div className="text-center py-5" style={{ backgroundColor: "#182d70" }}>
      <Copyright
          fontSize="15px"
          fontWeight="medium"
          textColor="text-gray-400"
        />
      </div>
    </footer>
  );
};

export default Footer;

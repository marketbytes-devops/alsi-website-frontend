import React, { useState, useEffect } from "react";
import NetworkBg from "../../../../assets/images/Network/our-network-bg.webp";
import UAE from "../../../../components/UiComponents/Network/Maps/UAE";
import Oman from "../../../../components/UiComponents/Network/Maps/Oman";
import KSA from "../../../../components/UiComponents/Network/Maps/KSA";
import Qatar from "../../../../components/UiComponents/Network/Maps/Qatar";

const OurNetwork = () => {
  const [activeCountry, setActiveCountry] = useState("Sulatanate of Oman");
  const [hoveredCountry, setHoveredCountry] = useState("Sulatanate of Oman");
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const data = {
      "United Arab Emirates": {
        location: "United Arab Emirates",
        company_name : "ALSI Global LLC",
        address: "Dubai National Insurance Building 5th Floor, Office 502, Diera, Dubai, UAE.",
        fax: "",
        contact_name: "Justin Varghese",
        position: "Country Manager - UAE",
        phone: "+971 4 5850934, +971 50 1074170",
        email: "jv@alsiglobal.com",
        offices: [
          { id: 1, office_name: "Deira, Dubai" },
          { id: 2, office_name: "Hatta Border" },
        ],
      },
      "Sulatanate of Oman": {
        location: "Sulatanate of Oman",
        company_name : "ALSI Global LLC",
        address: "P.O. Box 608. P.C: 322. W. Sohar, Sultanate Of OMAN.",
        fax: "+968 2675 5550",
        contact_name: "Mohammed Al Badi",
        position: "General Manager",
        phone: "+968 2675 5598, +968 9131 1118",
        email: "info@alsiglobal.com",
        offices: [
          { id: 1, office_name: "Sohar Freezone" },
          { id: 2, office_name: "Falaj Al Qabil" },
          { id: 3, office_name: "Hatta Border" },
          { id: 4, office_name: "Khatmat Shikala Border" },
          { id: 5, office_name: "Al Madina Logistics Hub" },
          { id: 6, office_name: "Muscat" },
          { id: 7, office_name: "Salalah" },
          { id: 8, office_name: "Duqm" },
        ],
      },
      "Kingdom of Saudi Arabia": {
        location: "Kingdom of Saudi Arabia",
        address: "Building No. 3475, Al Tail Street 9080, Dhahrat Laban Dist, PC 12564 Riyadh, Kingdom of Saudi Arabia",
        fax: "",
        contact_name: "Mr. Khalid Al Badi",
        position: "Operations Manager - KSA",
        phone: "+966 050 362 5981",
        email: "khalid@alsiglobal.com",
        offices: [
          { id: 1, office_name: "Riyadh" },
          { id: 2, office_name: "Rub Al Khali Border" },
        ],
      },
      "State of Qatar": {
        location: "State of Qatar",
        address: "C12 AL Emadi Business Center 2nd Floor Office 35, P.O. Box: 30611 Doha, Qatar.",
        fax: "",
        contact_name: "Adityan K J",
        position: "Branch Manager",
        phone: "+974 4047 8563, +974 3362 5333",
        email: "adityan@alsiglobal.com",
        offices: [
          { id: 1, office_name: "Doha" },
        ],
      },
    };

    setCountryData(data);
  }, []);

  const handleCountryClick = (country) => {
    setActiveCountry(country);
  };

  const activeCountryData = countryData[activeCountry] || {};
  const {
    location = "No location provided",
    company_name = "",
    address = "No address provided",
    fax = "No fax provided",
    contact_name = "No contact provided",
    position = "No position provided",
    phone = "No phone provided",
    email = "No email provided",
    offices = [],
  } = activeCountryData;

  const phoneNumbers = Array.isArray(phone) ? phone : phone ? phone.split(",") : [];

  return (
    <>
      <div
        className="h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12"
        style={{
          backgroundImage: `url(${NetworkBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(25, 51, 119, 0.7)",
          color: "white",
        }}
      >
        <div className="w-full lg:w-1/2 text-center lg:pr-6">
          <div className="map-svg-container w-full max-w-[450px] mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1166.776 870.253"
              className="w-full h-auto"
            >
              <g transform="translate(-6088.6 421.048)">
                <g
                  transform="translate(6859.722 -104.237)"
                  fill={activeCountry === "United Arab Emirates" ? "#1890F9" : "#125194"}
                  style={{
                    filter:
                      activeCountry === "United Arab Emirates"
                        ? "drop-shadow(10px 10px 15px #080808)"
                        : "none",
                    transition: "filter 0.3s ease, fill 0.3s ease",
                  }}
                  onClick={() => handleCountryClick("United Arab Emirates")}
                  onMouseEnter={() => setHoveredCountry("United Arab Emirates")}
                  onMouseLeave={() => setHoveredCountry(activeCountry)}
                >
                  <UAE />
                </g>
                <g
                  fill={activeCountry === "Sulatanate of Oman" ? "#1890F9" : "#125194"}
                  style={{
                    filter:
                      activeCountry === "Sulatanate of Oman"
                        ? "drop-shadow(4px 4px 4px #080808)"
                        : "none",
                    transition: "filter 0.3s ease, fill 0.3s ease",
                  }}
                  onClick={() => handleCountryClick("Sulatanate of Oman")}
                  onMouseEnter={() => setHoveredCountry("Sulatanate of Oman")}
                  onMouseLeave={() => setHoveredCountry(activeCountry)}
                >
                  <Oman />
                </g>
                <g
                  transform="translate(6088.6 -421.048)"
                  fill={activeCountry === "Kingdom of Saudi Arabia" ? "#1890F9" : "#125194"}
                  style={{
                    filter:
                      activeCountry === "Kingdom of Saudi Arabia"
                        ? "drop-shadow(10px 10px 15px #080808)"
                        : "none",
                    transition: "filter 0.3s ease, fill 0.3s ease",
                  }}
                  onClick={() => handleCountryClick("Kingdom of Saudi Arabia")}
                  onMouseEnter={() => setHoveredCountry("Kingdom of Saudi Arabia")}
                  onMouseLeave={() => setHoveredCountry(activeCountry)}
                >
                  <KSA />
                </g>
                <g
                  transform="translate(6818.349 -106.485)"
                  fill={activeCountry === "State of Qatar" ? "#1890F9" : "#125194"}
                  style={{
                    filter:
                      activeCountry === "State of Qatar"
                        ? "drop-shadow(10px 10px 15px #080808)"
                        : "none",
                    transition: "filter 0.3s ease, fill 0.3s ease",
                  }}
                  onClick={() => handleCountryClick("State of Qatar")}
                  onMouseEnter={() => setHoveredCountry("State of Qatar")}
                  onMouseLeave={() => setHoveredCountry(activeCountry)}
                >
                  <Qatar />
                </g>
              </g>
            </svg>
          </div>
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg"
            style={{ opacity: 0.9 }}
          >
            Click here to explore {hoveredCountry}
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-left mt-8 lg:mt-0 space-y-6 px-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold pb-3">
              {location || "Select a Country"}
            </h2>
            <p className="text-md">{company_name}</p>
            <div className="w-[auto] sm:w-[auto] md:w-[200px] lg:w-[200px] xl:w-[200px] leading-none sm:leading-none md:leading-10 lg:leading-10 xl:leading-10">
              <p className="text-md">{address}</p>
            </div>
            <p className="text-md">{fax}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[1.75rem] sm:text-[1.875rem] font-bold">Contact:</h3>
            <p className="text-md">{contact_name}</p>
            <p className="text-md">{position}</p>
            {phoneNumbers.map((number, index) => (
              <p key={index} className="text-md flex items-center justify-between">
                <span>{number}</span>
              </p>
            ))}
            <p className="text-md">{email}</p>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-[#212529] px-8 pt-14">
        <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold mb-8">
          Offices in {location || "Select a Country"}
        </h2>
        <ul className="list-none list-inside flex items-center justify-center w-full overflow-x-auto">
          {offices &&
            offices.map((office) => (
              <li
                key={office.id}
                className="flex items-center justify-center text-md min-w-64 px-4 py-4 text-center text-[16px] font-normal hover:font-bold border-gray-400 border-r last:border-none transition-all duration-300"
              >
                {office.office_name || "No office name provided"}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default OurNetwork;

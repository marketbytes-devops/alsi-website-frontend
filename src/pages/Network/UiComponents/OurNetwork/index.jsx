import React, { useState, useEffect } from "react";
import NetworkBg from "../../../../assets/images/Network/our-network-bg.webp";
import UAE from "../../../../components/UiComponents/Network/Maps/UAE";
import Oman from "../../../../components/UiComponents/Network/Maps/Oman";
import KSA from "../../../../components/UiComponents/Network/Maps/KSA";
import Qatar from "../../../../components/UiComponents/Network/Maps/Qatar";

const OurNetwork = () => {
  const [activeCountry, setActiveCountry] = useState("Sulatanate of Oman");
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const data = {
      "United Arab Emirates": {
        location: "United Arab Emirates",
        address: "123 UAE Street, Dubai, UAE",
        fax: "+971 4 123 4567",
        contact_name: "John Doe",
        position: "Regional Manager",
        phone: "+971 4 123 4567, +971 50 123 4567",
        email: "uae@company.com",
        offices: [
          { id: 1, office_name: "Dubai HQ" },
          { id: 2, office_name: "Abu Dhabi Office" },
        ],
      },
      "Sulatanate of Oman": {
        location: "Sulatanate of Oman",
        address: "456 Oman Avenue, Muscat, Oman",
        fax: "+968 24 123 456",
        contact_name: "Ali Al-Hassan",
        position: "Sales Manager",
        phone: "+968 24 123 456",
        email: "oman@company.com",
        offices: [
          { id: 1, office_name: "Muscat HQ" },
          { id: 2, office_name: "Sohar Office" },
        ],
      },
      "Kingdom of Saudi Arabia": {
        location: "Kingdom of Saudi Arabia",
        address: "789 KSA Street, Riyadh, KSA",
        fax: "+966 11 123 4567",
        contact_name: "Fatimah Al-Saud",
        position: "Marketing Director",
        phone: "+966 11 123 4567",
        email: "ksa@company.com",
        offices: [
          { id: 1, office_name: "Riyadh HQ" },
          { id: 2, office_name: "Jeddah Office" },
        ],
      },
      "State of Qatar": {
        location: "State of Qatar",
        address: "1010 Qatar Road, Doha, Qatar",
        fax: "+974 44 123 456",
        contact_name: "Mohammad Al-Hashim",
        position: "Operations Manager",
        phone: "+974 44 123 456",
        email: "qatar@company.com",
        offices: [
          { id: 1, office_name: "Doha HQ" },
          { id: 2, office_name: "Al Wakrah Office" },
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
                >
                  <Qatar />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-left mt-8 lg:mt-0 space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold pb-3">
              {location || "Select a Country"}
            </h2>
            <div>
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
        <ul className="list-none list-inside flex items-center justify-center">
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

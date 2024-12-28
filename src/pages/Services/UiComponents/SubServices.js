import React from "react";
import serviceImg from "../../../assets/images/Services/live-stock-clearance.webp";

const SubService = () => {
  const subservices = [
    {
      id: 1,
      subservice_title: "Customs Clearance",
      subservices: [
        { title: "General Goods Clearance", img: serviceImg },
        { title: "Dangerous Goods Clearance", img: serviceImg },
        { title: "Livestock Clearance", img: serviceImg },
        { title: "Free Zone Clearance", img: serviceImg },
      ],
    },
    {
      id: 2,
      subservice_title:
        "Locations We Provide Customs Clearance Services in Oman",
      subservices: [
        { title: "Muscat International Airport", img: serviceImg },
        { title: "Sohar Port and Free Zone", img: serviceImg },
        { title: "Hatta Border, Oman", img: serviceImg },
        { title: "Khatmat Shikala", img: serviceImg },
        { title: "Duqm Port and Free Zone", img: serviceImg },
        { title: "Salalah Sea Port", img: serviceImg },
        { title: "Rub Al Khali, Oman", img: serviceImg },
        { title: "Al Madina Logistics Hub, Liwa", img: serviceImg },
        { title: "Al Logistics Hub, Liwa", img: serviceImg },
        { title: "Al Logistics H Port", img: serviceImg },
        { title: "Al Hub Port", img: serviceImg },
        { title: "Al Logistics", img: serviceImg },
        { title: "Logistics Khali, Oman", img: serviceImg },
        { title: "Muscat Inter Airport", img: serviceImg },
        { title: "Muscat Internation Port", img: serviceImg },
        { title: "Muscat Inter Airport", img: serviceImg },
        { title: "Muscat International Port", img: serviceImg },
      ],
    },
    {
      id: 3,
      subservice_title:
        "Locations We Provide Customs Clearance Service in Qatar",
      subservices: [
        { title: "Muscat International Airport", img: serviceImg },
        { title: "Sohar Port and Free Zone", img: serviceImg },
        { title: "Hatta Border, Oman", img: serviceImg },
        { title: "Khatmat Shikala", img: serviceImg },
        { title: "Duqm Port and Free Zone", img: serviceImg },
        { title: "Salalah Sea Port", img: serviceImg },
        { title: "Rub Al Khali, Oman", img: serviceImg },
        { title: "Al Madina Logistics Hub, Liwa", img: serviceImg },
      ],
    },
  ];

  return (
    <div className="p-5 space-y-8">
      {subservices.map((subservice, index) => (
        <div key={index} className="subservice-group">
          <h2 className="text-xl font-bold mb-4">
            {subservice.subservice_title}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {subservice.subservices.map((item, index) => (
              <div
                key={index}
                className="subservice-item text-center p-4 border rounded shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto mb-2"
                />
                <p className="font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubService;

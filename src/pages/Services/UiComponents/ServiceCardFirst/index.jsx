import React from "react";
import cardContainerBg from "../../../../assets/images/Services/service-main-bg.webp";

const ServiceCardFirst = () => {
  return (
    <div className="overflow-hidden w-full h-auto">
      <div className="">
        <div className="card-container" style={{backgroundImage:`url(${cardContainerBg})`, backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
          {
            subServices.map((subService, index)=>{
              <div className="flex flex-wrap justify-center items-center">
                <div className="subservices-card" key={index}>
                  <div className="card-body">
                      <img src={subService.image} className="h-auto w-full" alt={subService.title} />
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ServiceCardFirst;

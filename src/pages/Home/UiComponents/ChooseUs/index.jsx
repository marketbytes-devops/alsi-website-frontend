import React, {useState, useEffect} from "react";
import apiClient from "../../../../api";
import LottieLoader from "../../../../components/LottieLoader";

const ChooseUs = () => {
  const [chooseUsData, setChooseUsData] = useState(null);

  useEffect(() => {
    apiClient.get("home/chooses/")
      .then((response) => {
        if (response.data.length > 0) {
          setChooseUsData(response.data[0]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching chooseUs data", error.response ? error.response.data : error.message);
      });
  }, []);
  
  if (!chooseUsData) {
    return <p><LottieLoader/></p>;
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between md:h-screen sm:h-[400px]"
      style={{
        background: `url(${`${chooseUsData.image}`})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        objectFit:"fill",
      }}
    >
      <div className="w-full md:w-[60%] pt-2 sm:pt-2 md:pt-0 lg:pt-0">
        <div className="flex flex-wrap justify-center sm:justify-center md:justify-start lg:justify-start md:px-28 sm:px-0 mt-12 sm:mt-12 lg:mt-0 md:lg-0">
          <div className="text-center sm:text-center md:text-right lg:text-right xl:text-right">
          <div
            className="mb-4 text-[#212529]" 
            dangerouslySetInnerHTML={{ __html: chooseUsData.title }} 
          />
          <div
            className="pl-8 sm:pl-8 md:pl-36 lg:pl-36 xl:pl-36 pr-8 sm:pr-8 md:pr-0 lg:pr-0 xl:pr-0" 
            dangerouslySetInnerHTML={{ __html: chooseUsData.description }} 
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;

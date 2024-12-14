import React, { useEffect, useState } from "react";
import OurNetwork from "./UiComponents/OurNetwork";
import Banner from "../../components/UiComponents/Banner";
import apiClient from "../../api";
import Services from "../../components/UiComponents/Services";

const Network = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("network/banner/")
      .then((response) => {
        if (response.data.length > 0) {
          const banner = response.data[0];
          // Map API response fields to required component fields
          setBannerData({
            ...banner,
            firstList: banner.first_list,
            secondList: banner.second_list,
          });
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching banner data",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  if (!bannerData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div>
        <div className="md:mx-28 lg:mx-28 mx-4 sm:mx-4 py-8 text-gray-800">
          <h6 className="text-[15px] font-extrabold mb-4">
            {bannerData.highlights}
          </h6>
          <p className="mb-4  text-[17.5px] font-light">
            {bannerData.description}
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-[17.5px] font-normal">
              {bannerData.firstList}
            </li>
            <li className="text-[17.5px] font-normal">
              {bannerData.secondList}
            </li>
          </ul>
          <p className="mt-6 text-[17.5px] font-light">
            {bannerData.conclusion}
          </p>
        </div>
      </div>
      <div>
        <OurNetwork />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Services />
      </div>
    </div>
  );
};

export default Network;

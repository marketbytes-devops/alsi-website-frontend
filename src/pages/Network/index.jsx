import React, { useEffect, useState } from "react";
import OurNetwork from "./UiComponents/OurNetwork";
import Banner from "../../components/UiComponents/Banner";
import apiClient from "../../api";
import Services from "../../components/UiComponents/Services";

const Network = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("network/our-network-banner/")
      .then((response) => {
        if (response.data.length > 0) {
          const banner = response.data[0];

          setBannerData({
            ...banner,
            lists: banner.lists,
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
      <div className="overflow-hidden mb-6 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div className="mb-6">
        <div className="md:mx-28 lg:mx-28 mx-4 sm:mx-4 py-8 text-[#212529]">
          <div
            dangerouslySetInnerHTML={{ __html: bannerData.highlights }}
            className="text-[15px] font-extrabold mb-4"
          />
          <div
            dangerouslySetInnerHTML={{ __html: bannerData.description }}
            className="mb-4 text-[17.5px] font-light"
          />
          <div className="space-y-2">
            <div
              dangerouslySetInnerHTML={{ __html: bannerData.lists }}
              className="pl-8 text-[17.5px] font-normal"
            />
          </div>
          <div className="mt-6 text-[17.5px] font-light" dangerouslySetInnerHTML={{ __html: bannerData.conclusion }} />
        </div>
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <OurNetwork />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Services />
      </div>
    </div>
  );
};

export default Network;

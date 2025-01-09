import React, { useEffect, useState } from "react";
import SecondLayout from "../../../components/CardLR/SecondLayout";
import FirstLayout from "../../../components/CardLR/FirstLayout";
import apiClient from "../../../api";
import Banner from "../../../components/UiComponents/Banner";
import Services from "../../../components/UiComponents/Services";
import Industries from "../../../components/UiComponents/Industries";
import Form from "../../../components/UiComponents/Form";

const SpecializedSetup = () => {
  const [specializedServiceData, setSpecializedServiceData] = useState([]);
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("service/specialized-banner/")
      .then((response) => {
        console.log("Banner response:", response.data);
        if (response.data.length > 0) {
          setBannerData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching banner data",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  useEffect(() => {
    const fetchSpecializedServiceData = async () => {
      try {
        const response = await apiClient.get("service/specialized-entries/");
        console.log("Specialized service data fetched:", response.data);
        setSpecializedServiceData(response.data);
      } catch (error) {
        console.error("Failed to fetch specialized data:", error);
      }
    };

    fetchSpecializedServiceData();
  }, []);

  return (
    <div>
      {bannerData ? (
        <div className="mb-4 sm:mb-4 md:mb-24 lg:mb-24 xl:mb-24">
          <Banner
            image={bannerData.image}
            title={bannerData.title}
          />
        </div>
      ) : (
        <p>Loading banner...</p>
      )}

      {specializedServiceData.length > 0 ? (
        specializedServiceData.map((specialized, index) => {
          const LayoutComponent = index % 2 === 1 ? SecondLayout : FirstLayout;
          return (
            <div className="w-auto mx-4 sm:mx-4 md:mx-24 lg:mx-24 xl:mx-24 mb-4 sm:mb-4 lg:mb-8 xl:mb-8">
            <LayoutComponent
              key={specialized.id}
              imageUrl={specialized.image || ""}
              title={specialized.title.replace(/<\/?p>/g, "")}
              description={specialized.description.replace(/<\/?p>/g, "")}
              showLink={true}
              link_url={specialized.link_url}
            />
            </div>
          );
        })
      ) : (
        <p>No data available to display.</p>
      )}
      <div className="mt-10">
        <Services initialTitle="Other Services" />
      </div>

      <div className="space-y-4 my-12">
        <Industries />
      </div>

      <div className="my-12">
        <Form />
      </div>
    </div>
  );
};

export default SpecializedSetup;

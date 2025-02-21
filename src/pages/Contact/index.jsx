import React, { useEffect, useState } from "react";
import contactBanner from "../../assets/images/Contact/contact-banner.webp";
import ContactUsForm from "../../components/UiComponents/Form/ContactUsForm";
import Banner from "../../components/UiComponents/Banner";
import apiClient from "../../api";
import LottieLoader from "../../components/LottieLoader";

const Contact = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("contact/contact-banner/")
      .then((response) => {
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

  if (!bannerData) {
    return <p><LottieLoader/></p>;
  }

  return (
    <div>
      <div className="overflow-hidden mb-4 sm:mb-4 lg:mb-10 md:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div className="mx-4 md:mx-24 sm:mx-4">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default Contact;

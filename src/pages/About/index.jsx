import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import apiClient from "../../api";
import Team from './UiComponents/Team';
import Form from '../../components/UiComponents/Form';
import Story from './UiComponents/Story';
import MissionVision from './UiComponents/MissionVision';
import Certification from './UiComponents/Certification';
import Banner from '../../components/UiComponents/Banner';
import Milestones from './UiComponents/Milestones';
import LottieLoader from '../../components/LottieLoader';

const About = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient
      .get("about/banner/")
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LottieLoader />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Freight Forwarding Companies and Forwarders in Oman
        </title>
        <meta
          name="description"
          content="ALSI, your reliable partner in freight forwarding companies and trusted freight forwarders in Oman, ensuring efficient and seamless cargo transportation."
        />
        <meta
          name="keywords"
          content="freight forwarding companies in oman, freight forwarders in oman"
        />
        <meta
          property="og:url"
          content="https://www.alsiglobal.com/freight_forwarders_and_forwarding_companies_in_oman"
        />
        <meta
          property="og:title"
          content="Freight Forwarding Companies and Forwarders in Oman"
        />
        <meta
          property="og:description"
          content="ALSI, your reliable partner in freight forwarding companies and trusted freight forwarders in Oman, ensuring efficient and seamless cargo transportation."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main role="main">

        <section
          aria-label="About Banner"
          className="overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Banner image={bannerData.image} title={bannerData.title} />
        </section>

        <section
          aria-label="Our Story"
          className="mx-4 sm:mx-4 md:mx-28 lg:mx-28 mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Story />
        </section>

        <section
          aria-label="Journey Through Milestones"
          className="overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Milestones />
        </section>

        <section
          aria-label="Our Team"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Team />
        </section>

        <section
          aria-label="Mission, Vision, and Purpose"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0 mx-4 sm:mx-4 md:mx-28 lg:mx-28"
        >
          <MissionVision />
        </section>

        <section
          aria-label="Memberships and Certifications"
          className="mb-20 mt-4 sm:mt-4 md:mt-0 lg:mt-0 mx-4 sm:mx-4 md:mx-28 lg:mx-28"
        >
          <Certification />
        </section>

        <section
          aria-label="Contact Form"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Form />
        </section>
      </main>
    </>
  );
};

export default About;
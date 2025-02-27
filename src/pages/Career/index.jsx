import React, { useEffect, useState } from 'react'
import CareerForm from '../../components/UiComponents/Form/CareerForm'
import Banner from '../../components/UiComponents/Banner'
import apiClient from '../../api'
import LottieLoader from '../../components/LottieLoader'
import { Helmet } from 'react-helmet-async'

const Career = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient.get("careers/careers-banner/")
      .then((response) => {
        if (response.data.length > 0) {
          setBannerData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching banner data", error.response ? error.response.data : error.message);
      });
  }, []);

  if (!bannerData) {
    return <p><LottieLoader /></p>;
  }

  return (
    <>
      <Helmet>
        <title>Careers | ALSI Global</title>
        <meta
          name="description"
          content="Take the next step in your career with us. Explore opportunities and grow professionally."
        />
        <meta
          property="og:url"
          content="https://www.alsiglobal.com/careers"
        />
        <meta
          property="og:title"
          content="Contact Us Today | ALSI Global"
        />
        <meta
          property="og:description"
          content="Take the next step in your career with us. Explore opportunities and grow professionally."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.alsiglobal.com/careers"
        />
      </Helmet>
      <div className="overflow-hidden mb-4 sm:mb-4 lg:mb-10 md:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div className='mx-4 md:mx-24 sm:mx-4'>
        <CareerForm />
      </div>
    </>
  )
}

export default Career

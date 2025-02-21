import React, { useState, useEffect } from 'react';
import Services from '../../components/UiComponents/Services';
import Form from '../../components/UiComponents/Form';
import Banner from '../../components/UiComponents/Banner';
import MainIndustries from './UiComponents/MainIndustries';
import apiClient from '../../api';
import LottieLoader from '../../components/LottieLoader';

const Industries = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient.get("industry/industry-banner/")
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
    return <p><LottieLoader/></p>;
  }

  return (
    <>
      <div className="overflow-hidden mb-10">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div className='md:mx-28 lg:mx-28 mx-4 sm:mx-4'>
        <MainIndustries/>
      </div>
      <div className="mb-16 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Services  />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Form />
      </div>
    </>
  );
}

export default Industries;

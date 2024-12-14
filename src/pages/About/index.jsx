import React, { useEffect, useState } from 'react';
import Team from './UiComponents/Team';
import Form from '../../components/UiComponents/Form';
import Story from './UiComponents/Story';
import MissionVision from './UiComponents/MissionVision';
import Certification from './UiComponents/Certification';
import apiClient from '../../api';
import Banner from '../../components/UiComponents/Banner';
import Milestones from './UiComponents/Milestones';

const About = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient.get("about/banner/")
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <div className='mx-4 sm:mx-4 md:mx-28 lg:mx-28 mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        <Story/>
      </div>
      <div className='overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        <Milestones/>
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Team/>
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0 mx-4 sm:mx-4 md:mx-28 lg:mx-28">
        <MissionVision/>
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0 mx-4 sm:mx-4 md:mx-28 lg:mx-28">
        <Certification/>
      </div>
      <div className='mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        <Form/>
      </div>
    </div>
  );
};

export default About;

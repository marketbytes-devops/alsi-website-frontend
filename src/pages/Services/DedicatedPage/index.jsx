import React from 'react';
import { useParams } from 'react-router-dom';
import Services from '../../../components/UiComponents/Services';
import { bannerImages, serviceContent } from '../../../data/servicesData';
import SubService from '../UiComponents/SubServices';
import Banner from '../../../components/UiComponents/Banner';

const DedicatedPage = () => {
  const { name } = useParams();

  if (!name) {
    return <p>Service name is not defined.</p>;
  }

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const serviceTitle = toTitleCase(name.replace(/_/g, ' '));

  const bannerImage = bannerImages[name] || 'defaultBanner';
  const contentParagraphs = serviceContent[name]?.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  )) || <p>Content for {serviceTitle} service.</p>;

  return (
    <>
      <div className="flex flex-grow">
        <Banner image={bannerImage} title={serviceTitle} />
      </div>
      <div>
        <p className="px-4 sm:px-4 md:px-28 lg:px-28 xl:px-32 space-y-4 my-12">
          {contentParagraphs}
        </p>
      </div>
      <div className="">
        <SubService />
      </div>
      <div className="">
      <Services initialTitle="Other Services" excludeService={name} />
      </div>
    </>
  );
};

export default DedicatedPage;

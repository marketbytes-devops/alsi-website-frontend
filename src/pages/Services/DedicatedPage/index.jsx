import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../../components/UiComponents/Banner";
import Services from "../../../components/UiComponents/Services";
import Form from "../../../components/UiComponents/Form";
import SubService from "../SubService";
import Industries from "../../../components/UiComponents/Industries";

const DedicatedPage = () => {
  const { state } = useLocation();
  const {
    banner_image,
    service_title = "No Title Available",
    content_paragraphs = "No Content Available",
  } = state || {};

  const currentServiceUrl = window.location.href;

  useEffect(() => {
    console.log("Service state received:", state);
  }, [state]);

  return (
    <>
      <div className="flex flex-grow">
        <Banner
          image={banner_image}
          mainTitle={service_title}
          currentUrl={currentServiceUrl}
          showMainTitle={true}
        />
      </div>
      <div className="px-4 sm:px-4 md:px-28 lg:px-28 xl:px-28 space-y-4 my-12">
        {content_paragraphs && (
          <div dangerouslySetInnerHTML={{ __html: content_paragraphs }} />
        )}
      </div>
      <div className="w-full">
        <SubService />
      </div>
      <div className="">
        <Services initialTitle="Other Services" excludeService={name} />
      </div>
      <div className="space-y-4 my-12">
        <Industries />
      </div>
      <div className="my-12">
        <Form />
      </div>
    </>
  );
};

export default DedicatedPage;

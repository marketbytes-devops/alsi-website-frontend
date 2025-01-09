import React from "react";
import Banner from "./UiComponents/Banner";
import Services from "../../components/UiComponents/Services";
import Network from "../../components/UiComponents/Network";
import ChooseUs from "./UiComponents/ChooseUs";
import Differentiators from "./UiComponents/Differentiators";
import Achievements from "./UiComponents/Achievements";
import Highlights from "./UiComponents/Highlights";
import Industries from "../../components/UiComponents/Industries";
import Blog from "../../components/UiComponents/Blog";
import Form from "../../components/UiComponents/Form";

const Home = () => {
  return (
    <div>
      <div>
        <Banner />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Services />
      </div>
      <div>
        <Network />
      </div>
      <div className="mb-10 mt-0 sm:mt-0 md:mt-0 lg:mt-0">
        <ChooseUs />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Differentiators />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Achievements />
      </div>
      <div className="mb-6 sm:-mb-2 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Highlights />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Industries />
      </div>
      <div className="mb-10 mt-12 sm:mt-12 md:mt-0 lg:mt-0">
        <Blog />
      </div>
      <div className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Form />
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { Helmet } from "react-helmet-async";
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
  const [mountedComponents, setMountedComponents] = useState(0);
  const [forceRenderForm, setForceRenderForm] = useState(false);
  const totalComponents = 9;
  const achievementsRef = useRef(null); 

  const handleComponentMount = (componentName) => {
    setMountedComponents((prev) => {
      const newCount = prev + 1;
      console.log(`${componentName} mounted. Total mounted: ${newCount}/${totalComponents}`);
      return newCount;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!forceRenderForm) {
        console.log("Timeout triggered: Forcing Form render");
        setForceRenderForm(true);
      }
    }, 10000);

    const targetUrl = "https://www.alsiglobal.com/#achievements";
    const currentUrl = window.location.href.replace(/\/$/, "");
    const isTargetUrl = currentUrl === targetUrl || currentUrl === targetUrl.replace(/\/$/, "");

    if (isTargetUrl && achievementsRef.current) {
      const scrollTimeout = setTimeout(() => {
        achievementsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return () => clearTimeout(scrollTimeout);
    }

    return () => clearTimeout(timeout);
  }, [forceRenderForm]); 

  const canRenderForm = mountedComponents >= totalComponents || forceRenderForm;

  return (
    <>
      <Helmet>
        <title>Logistics Services and Shipping Companies in Muscat, Oman</title>
        <meta
          name="description"
          content="ALSI Global LLC offers comprehensive logistics solutions including customs clearance, freight forwarding, warehousing, and project cargo services across Oman, UAE, Qatar, and Saudi Arabia."
        />
        <meta
          name="keywords"
          content="logistics solutions, customs clearance, freight forwarding, warehousing, ALSI Global LLC, Oman logistics"
        />
        <meta
          property="og:title"
          content="ALSI Global LLC - Comprehensive Logistics Solutions"
        />
        <meta
          property="og:description"
          content="ALSI Global LLC offers comprehensive logistics solutions including customs clearance, freight forwarding, warehousing, and project cargo services across Oman, UAE, Qatar, and Saudi Arabia."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alsiglobal.com" />
        <meta property="og:image" content="https://alsiglobal.com/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ALSI Global LLC - Comprehensive Logistics Solutions"
        />
        <meta
          name="twitter:description"
          content="ALSI Global LLC offers comprehensive logistics solutions including customs clearance, freight forwarding, warehousing, and project cargo services across Oman, UAE, Qatar, and Saudi Arabia."
        />
        <meta
          name="twitter:image"
          content="https://alsiglobal.com/logo.webp"
        />
      </Helmet>

      <main role="main">
        <section aria-label="Hero Banner">
          <Banner onMount={() => handleComponentMount("Banner")} />
        </section>

        <section
          aria-label="Our Services"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Services onMount={() => handleComponentMount("Services")} />
        </section>

        <section aria-label="Our Network">
          <Network onMount={() => handleComponentMount("Network")} />
        </section>

        <section
          aria-label="Why Choose Us"
          className="mb-10 mt-0 sm:mt-0 md:mt-0 lg:mt-0"
        >
          <ChooseUs onMount={() => handleComponentMount("ChooseUs")} />
        </section>

        <section
          aria-label="Key Differentiators"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Differentiators onMount={() => handleComponentMount("Differentiators")} />
        </section>

        <section
          aria-label="Achievements"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
          ref={achievementsRef} 
        >
          <Achievements onMount={() => handleComponentMount("Achievements")} />
        </section>

        <section
          aria-label="Highlights"
          className="mb-6 sm:-mb-2 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Highlights onMount={() => handleComponentMount("Highlights")} />
        </section>

        <section
          aria-label="Industries We Serve"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          <Industries onMount={() => handleComponentMount("Industries")} />
        </section>

        <section
          aria-label="Latest Blog Posts"
          className="mb-10 mt-12 sm:mt-12 md:mt-0 lg:mt-0"
        >
          <Blog onMount={() => handleComponentMount("Blog")} />
        </section>

        <section
          aria-label="Contact Form"
          className="mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0"
        >
          {canRenderForm ? (
            <Form />
          ) : (
            <div className="skeleton"></div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
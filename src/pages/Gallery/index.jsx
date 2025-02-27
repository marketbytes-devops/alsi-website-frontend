import React, { useEffect, useState } from "react";
import apiClient from "../../api";
import GalleryMain from "./GalleryMain";
import Banner from "../../components/UiComponents/Banner";
import LottieLoader from "../../components/LottieLoader";
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    apiClient.get("gallery/gallery-banner/")
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
        <title>Gallery | ALSI Global</title>
        <meta
          name="description"
          content="Explore our gallery showcasing projects, solutions, and highlights from ALSI Global."
        />
        <meta
          property="og:url"
          content="https://www.alsiglobal.com/gallery"
        />
        <meta
          property="og:title"
          content="Gallery | ALSI Global"
        />
        <meta
          property="og:description"
          content="Explore our gallery showcasing projects, solutions, and highlights from ALSI Global."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.alsiglobal.com/gallery"
        />
      </Helmet>
      <div className="overflow-hidden mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Banner image={bannerData.image} title={bannerData.title} />
      </div>
      <GalleryMain />
    </>
  );
};

export default Gallery;

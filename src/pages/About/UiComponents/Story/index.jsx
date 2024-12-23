import React, { useEffect, useState } from "react";
import storyBg from "../../../../assets/images/About/about-story.webp";
import apiClient from "../../../../api";

const Story = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    apiClient.get("/about/our-story/")
      .then((response) => {
        if (response.data.length > 0) {
          setStoryData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching story data", error.response ? error.response.data : error.message);
      });
  }, []);

  if (!storyData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        background: `url(${storyBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex flex-col md:flex-row w-full items-start justify-center px-8 pt-8">
        <div className="w-full md:w-1/2 lg:w-1/2 pr-8 flex-shrink-0">
        <img
          src={storyData.image}
          className="object-cover w-full h-auto border-[13px] border-white"
          alt="Our Story"
        />
        </div>

        <div className="w-full flex flex-col items-left my-auto justify-center md:w-1/2 lg:w-1/2 pt-6 md:pt-0">
          <div className="text-left text-2xl md:text-3xl font-semibold text-white mb-4" dangerouslySetInnerHTML={{__html: storyData.title}} />
          <p className="text-left text-white my-4" dangerouslySetInnerHTML={{__html: storyData.description_first}} />
          <p className="text-left text-white my-4" dangerouslySetInnerHTML={{__html: storyData.description_second}} />
        </div>
      </div>

      <div className="w-full px-8 py-2">
        <p className="text-left text-white my-4" dangerouslySetInnerHTML={{__html: storyData.description_third}} />
      </div>
    </div>
  );
};

export default Story;

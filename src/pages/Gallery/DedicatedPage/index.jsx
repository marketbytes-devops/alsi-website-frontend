import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Banner from "../../../components/UiComponents/Banner";
import apiClient from "../../../api";

const GalleryDedicatedPage = () => {
  const { name: eventName } = useParams();
  console.log("eventName:", eventName);
  const [galleryItems, setGalleryItems] = useState(null);
  const [activeTab, setActiveTab] = useState("images");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        if (!eventName) {
          throw new Error("Event name is missing");
        }
        const response = await apiClient.get(
          `gallery/gallery-entries/${eventName}/`
        );
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery item:", error);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [eventName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleImageClick = (image) => {
    setFullscreenImage(image.image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div>
      <Banner
        image={galleryItems?.image}
        title={galleryItems?.main_title}
        backgroundSize="cover"
      />
      <div className="w-[98%] sm:w-[80%] mx-auto mb-5">
        <div className="flex justify-center gap-5 my-8">
          <motion.button
            onClick={() => setActiveTab("images")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              activeTab === "images"
                ? "bg-[#2044a2] text-white"
                : "bg-white text-[#2044a2] text-sm font-bold"
            } text-xs font-semibold py-2 px-4 rounded-sm duration-300 transition-all`}
          >
            Images
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("videos")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              activeTab === "videos"
                ? "bg-[#2044a2] text-white"
                : "bg-white text-[#2044a2] text-sm font-bold"
            } text-xs font-semibold py-2 px-4 rounded-sm duration-300 transition-all`}
          >
            Videos
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "images" && (
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 mt-5"
            >
              {galleryItems?.images.length > 0 ? (
                galleryItems?.images.map((image) => (
                  <motion.div
                    key={image.id}
                    className="flex justify-center items-center"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.image}
                      alt="Gallery"
                      className="w-full h-[300px] object-cover bg-cover rounded-md shadow-md cursor-pointer"
                      loading="lazy"
                    />
                  </motion.div>
                ))
              ) : (
                <p className="w-full">
                  Currently, there are no images available.
                </p>
              )}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5"
            >
              {galleryItems?.videos.length > 0 ? (
                galleryItems?.videos.map((video) => (
                  <motion.div key={video.id} className="relative flex justify-center">
                    <div className="relative">
                      <svg
                        height="12.3492mm"
                        style={{
                          shapeRendering: 'geometricPrecision',
                          textRendering: 'geometricPrecision',
                          imageRendering: 'optimizeQuality',
                          fillRule: 'evenodd',
                          clipRule: 'evenodd',
                        }}
                        version="1.1"
                        viewBox="0 0 225 225"
                        width="12.3492mm"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="absolute top-1/2 left-[300px] transform -translate-x-1/2 -translate-y-1/2 scale-100 hover:scale-110 transition-all duration-300"
                      >
                        <defs>
                          <style type="text/css">
                            {`
                              .fil1 { fill: #FEFEFE; }
                              .fil2 { fill: #2044a2; }
                              .fil0 { fill: #2044a2; }
                            `}
                          </style>
                        </defs>
                        <g id="Layer_x0020_1">
                          <g id="_445042792">
                            <rect className="fil0" height="225" rx="24" ry="24" width="225" />
                            <polygon className="fil1" points="88,71 124,92 161,113 124,133 88,154 88,113 " />
                            <polygon className="fil2" points="225,177 161,113 124,133 88,154 159,225 201,225 225,201 225,177 161,113 " />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center"
                    >
                      <img
                        src={video.thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover rounded-md shadow-md cursor-pointer"
                        loading="lazy"
                      />
                    </a>
                  </motion.div>
                ))
              ) : (
                <p>Currently, there are no videos available.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen"
                className="relative top-0 sm:top-0 md:top-10 lg:top-10 xl-top-10 w-[280px] h-auto sm:w-[280px] md:w-[800px] lg:w-[800px] xl:w-[800px] rounded-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              />
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullscreen();
                }}
                className="relative bottom-[75px] sm:bottom-[75px] md:bottom-[195px] lg:bottom-[195px] xl:bottom-[195px] right-10 text-white text-3xl font-semibold"
                whileHover={{ scale: 1.2 }}
              >
                &times;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryDedicatedPage;

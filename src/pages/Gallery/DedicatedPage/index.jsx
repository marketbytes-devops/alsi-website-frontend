// DedicatedGalleryPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        const response = await apiClient.get(`gallery/gallery/${eventName}/`);
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
      <Banner image={galleryItems?.banner_img} title={galleryItems?.title} />
      <div className="w-[98%] sm:w-[80%] mx-auto mb-5">
        <div className="flex justify-center gap-5">
          <button
            onClick={() => setActiveTab("images")}
            className={`${
              activeTab === "images"
                ? "bg-indigo-500 text-white"
                : "bg-white text-indigo-500"
            } py-2 px-5 rounded-full transition-all`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`${
              activeTab === "videos"
                ? "bg-indigo-500 text-white"
                : "bg-white text-indigo-500"
            } py-2 px-5 rounded-full transition-all`}
          >
            Videos
          </button>
        </div>

        {activeTab === "images" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {galleryItems?.images.map((image) => (
              <div
                key={image.id}
                className="flex justify-center items-center"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.image}
                  alt="Gallery"
                  className="w-full h-36 object-cover rounded-md shadow-md cursor-pointer"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {galleryItems?.videos.map((video) => (
              <div key={video.id} className="flex justify-center">
                <a
                  href={video.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center"
                >
                  <img
                    src={video.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-36 object-cover rounded-md shadow-md cursor-pointer"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        )}

        {fullscreenImage && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            onClick={closeFullscreen}
          >
            <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full" />
            <button
              onClick={closeFullscreen}
              className="absolute top-5 right-5 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDedicatedPage;

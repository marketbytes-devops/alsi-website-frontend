import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../api";

const GalleryMain = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await apiClient.get("gallery/gallery-entries/");
        setGalleryItems(response.data);
      } catch (error) {
        // Silently fail, no error handling
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!Array.isArray(galleryItems) || !galleryItems.length) {
    return <div></div>;
  }

  const reversedItems = [...galleryItems].reverse();

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 mb-4">
      {reversedItems
        .filter((item) => item.slug)
        .map((item) => (
          <Link to={`/gallery/${item.slug}`} key={item.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-[1.03] transition-transform duration-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-56 object-cover"
                loading="lazy"
              />
              <div className="p-4 text-center">
                <h2
                  className="text-lg font-semibold text-gray-900"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <p className="text-zinc-500">{item.year}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default GalleryMain;
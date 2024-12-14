import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api";

const GalleryMain = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await apiClient.get("gallery/gallery/");
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setError("Failed to load gallery items.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(galleryItems) || galleryItems.length === 0) {
    return <div>No gallery items available.</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 mb-4">
      {galleryItems
        .filter((item) => item.path) 
        .map((item) => (
          <Link to={`/gallery/${item.path}`} key={item.id}>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.03] transition-transform duration-300">
            <img
              src={item.banner_img}
              alt={item.title}
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-zinc-500">({item.year})</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryMain;

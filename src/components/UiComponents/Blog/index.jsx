import React, { useRef, useState, useEffect } from "react";
import Title from "../../Title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../../api";

function truncateDescription(text) {
  if (typeof text !== 'string') {
    return '';
  }
  const words = text.split(/\s+/);
  if (words.length <= 16) {
    return text;
  }
  return words.slice(0, 16).join(' ') + '...';
}

const Blog = () => {
  const [title, setTitle] = useState("Market Updates");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("blog/posts/");
        const postsData = response.data;

        if (postsData.length > 0) {
          setTitle(postsData[0].title);
          setPosts(postsData);
        } else {
          setTitle("No Posts Available");
        }
      } catch (err) {
        setError("Failed to load Posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Assume that we want to show the latest 4 posts
  const latestPosts = posts.slice(0, 4);

  return (
    <div className="py-8" style={{ background: "linear-gradient(90deg, #193377, #0086bf)" }}>
      <div className="text-center mb-4">
        <Title title={title} color="white" />
      </div>

      <div className="px-4 py-6 mx-4 md:mx-32">
        <div className="block md:hidden">
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{ delay: 3000 }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="mySwiper"
          >
            {latestPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="bg-white rounded-md overflow-hidden">
                  {post.entries && post.entries.length > 0 ? (
                    post.entries.map((entry) => (
                      <div key={entry.id} className="p-2">
                        {entry.image ? (
                          <img
                            src={entry.image}
                            alt={entry.title}
                            className="w-full h-56 object-cover"
                            style={{ borderRadius: "8px" }}
                          />
                        ) : (
                          <div className="text-center text-gray-500">No image available</div>
                        )}
                        <h3 className="text-lg font-bold p-2">{entry.title}</h3>
                        <p className="text-gray-700 font-medium text-sm mb-4 px-2">
                        {truncateDescription(entry.description)}
                        </p>
                        <Link to={`/blog/${post.id}`} className="read-more-btn px-2">
                          Read More
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No entries available</div>
                  )}
                </div>
              </SwiperSlide>
            ))}
            <div className="flex justify-center mt-4 space-x-4 pt-8">
              <button className="bg-gray-100 hover:bg-[#2044a2] hover:text-white w-10 h-10 rounded-full" ref={prevRef}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button className="bg-gray-100 hover:bg-[#2044a2] hover:text-white w-10 h-10 rounded-full" ref={nextRef}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </Swiper>
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-md hover:scale-[1.02] transition-scale duration-300 overflow-hidden">
              {post.entries && post.entries.length > 0 ? (
                post.entries.map((entry) => (
                  <div key={entry.id} className="p-2">
                    {entry.image ? (
                      <img
                        src={entry.image}
                        alt={entry.title}
                        className="w-full h-56 object-cover"
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      <div className="text-center text-gray-500">No image available</div>
                    )}
                    <div className="p-3">
                    <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
                    <p className="text-gray-700 font-medium text-sm mb-4">
                      {truncateDescription(entry.description)}
                    </p>
                    <Link to={`/blog/${post.id}`} className="read-more-btn">
                      Read More
                    </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500">No entries available</div>
              )}
            </div>
          ))}
        </div>

        <div className="md:grid justify-center items-center mt-12 hidden">
          <Link
            to="/market_updates"
            className="text-white text-sm font-medium mr-3 flex items-center"
          >
            Read More
            <FontAwesomeIcon
              icon={faAngleRight}
              className="ml-2 rounded-full px-[12px] py-[10px] text-[#2044a2] bg-white hover:bg-[#2044a2] hover:text-white transform transition-all"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;

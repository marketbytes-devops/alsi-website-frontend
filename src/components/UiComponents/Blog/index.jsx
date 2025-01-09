import React, { useRef, useState, useEffect } from "react";
import Title from "../../Title";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../../api";

function truncateText(text, limit) {
  if (typeof text !== "string") {
    return "";
  }
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

const Blog = () => {
  const [title_highlights, setTitle] = useState("Market Updates");
  const [posts, setPosts] = useState([]);
  const [blogUrl, setBlogUrl] = useState("/market_updates");
  const [loadingTitle, setLoadingTitle] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await apiClient.get("market/blog-banner/");
        const banners = response.data;
        if (banners.length > 0) {
          setTitle(banners[0].title_highlights);
          setBlogUrl(banners[0].blog_url || "/market_updates");
        } else {
          setTitle("No Posts Available");
        }
      } catch (err) {
        setErrorTitle("Failed to load title. Please try again.");
      } finally {
        setLoadingTitle(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("market/blog-entries/");
        setPosts(response.data);
      } catch (err) {
        setErrorPosts("Failed to load posts. Please try again.");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchTitle();
    fetchPosts();
  }, []);

  if (loadingTitle || loadingPosts) return <div className="text-center">Loading...</div>;
  if (errorTitle || errorPosts) return (
    <div className="text-center text-red-500">
      {errorTitle && <div>{errorTitle}</div>}
      {errorPosts && <div>{errorPosts}</div>}
    </div>
  );

  const latestPosts = posts.slice(0, 4);


  const handleReadMore = (post) => {
    if (!post.blog_slug) {
      return;
    }
  
    const selectedIndex = posts.findIndex((entry) => entry.blog_slug === post.blog_slug);
  
    const recentPosts = [];
    for (let i = selectedIndex - 2; i <= selectedIndex + 1; i++) {
      if (i >= 0 && i < posts.length && i !== selectedIndex) {
        recentPosts.push(posts[i]);
      }
    }
  
    if (recentPosts.length < 3) {
      const additionalPosts = posts.filter(
        (entry, index) => !recentPosts.includes(entry) && index !== selectedIndex
      );
  
      for (let i = 0; recentPosts.length < 3 && i < additionalPosts.length; i++) {
        recentPosts.push(additionalPosts[i]);
      }
    }
  
    navigate(`/market_updates/${post.blog_slug}/`, {
      state: {
        image: post.image,
        description: post.description || "No Description Available",
        blogTitle: post.main_title || "No Title Available",
        currentDate: post.date || "No Date Available",
        currentTime: post.time || "No Time Available",
        highlightBlog: post.intro || "No Highlights Available",
        blogContent: post.additional_content || "No Content Available",
        recentPosts: recentPosts.slice(0, 3), 
      },
    });
  };

  return (
    <div className="py-8" style={{ background: "linear-gradient(90deg, #193377, #0086bf)" }}>
      <div className="text-center mb-4">
        <Title title={title_highlights} color="white" />
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
              <SwiperSlide key={post.blog_slug}>
                <div className="bg-white p-2 rounded-md overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.blog_title}
                      className="w-full h-56 object-cover"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <div className="text-center text-gray-500">No image available</div>
                  )}
                  <p className="text-lg text-[#212529] font-bold p-2" dangerouslySetInnerHTML={{
                    __html: truncateText(post.blog_title, 79),
                  }}/>
                  <p className="text-[#212529] font-medium text-sm mb-4 px-2" dangerouslySetInnerHTML={{
                    __html: truncateText(post.description, 95),
                  }}/>
                  <button
                    className="text-[#212529] read-more-btn px-2"
                    onClick={() => handleReadMore(post)} 
                  >
                    Read More
                  </button>
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
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.blog_title}
                  className="w-full h-56 object-cover p-2"
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="text-center text-gray-500">No image available</div>
              )}
              <div className="p-3">
                <p className="text-[#212529] text-lg font-bold mb-2" dangerouslySetInnerHTML={{
                    __html: truncateText(post.blog_title, 58),
                  }}/>
                <p className="text-[#212529] font-medium text-sm sm:mb-4 md:mb-8 lg:mb-8 xl:mb-8" dangerouslySetInnerHTML={{
                    __html: truncateText(post.description, 65),
                  }}/>
                <button
                  onClick={() => handleReadMore(post)} 
                  className="read-more-btn"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:grid justify-center items-center mt-12 hidden">
          <Link
            to={blogUrl}
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

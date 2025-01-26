import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../api"; 
import Banner from "../../../components/UiComponents/Banner";
import Form from "../../../components/UiComponents/Form";

const MainMarket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blogContainerRef = useRef(null);

  const [blogData, setBlogData] = useState({
    image: null,
    description: "No Description Available",
    blogTitle: "No Title Available",
    currentDate: "No Date Available",
    currentTime: "No Time Available",
    highlightBlog: "No Highlights Available",
    blogContent: "No Content Available",
    recentPosts: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {

        const blogSlug = window.location.pathname.split('/').pop();

        if (state && state.blogTitle) {
          setBlogData(state);
          setLoading(false);
          return;
        }

        const response = await apiClient.get(`market/blog-entries/${blogSlug}/`);
        
        const recentPostsResponse = await apiClient.get('market/blog-entries/');
        const sortedPosts = recentPostsResponse.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .filter(post => post.blog_slug !== blogSlug)
          .slice(0, 3);

        setBlogData({
          image: response.data.image,
          description: response.data.description,
          blogTitle: response.data.main_title,
          currentDate: response.data.date,
          currentTime: response.data.time,
          highlightBlog: response.data.intro,
          blogContent: response.data.additional_content,
          recentPosts: sortedPosts
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog details", err);
        setError("Unable to load blog details");
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [state]);

  const handleReadMore = (recentPost) => {
    navigate(`/market_updates/${recentPost.blog_slug}/`, {
      state: {
        image: recentPost.image,
        description: recentPost.description,
        blogTitle: recentPost.main_title,
        currentDate: recentPost.date,
        currentTime: recentPost.time,
        highlightBlog: recentPost.intro || "No Highlights Available",
        blogContent: recentPost.additional_content || "No Content Available",
        recentPosts: blogData.recentPosts
      }
    });
  };

  const cleanBlogContent = blogData.blogContent.replace(/<h6>\s*<br>\s*<\/h6>/g, "");
  const currentBlogUrl = window.location.href;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div className="container mb-6 sm:mb-6 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
      {blogData.image && (
        <Banner
          image={blogData.image}
          mainTitle={blogData.blogTitle}
          date={blogData.currentDate || "No date available"}
          time={blogData.currentTime || "No time available"}
          currentUrl={currentBlogUrl}
          showSocialMedia={true}
          showMainTitle={true}
          showDateTime={true}
        />
      )}
      <div
        className="text-center mx-3 sm:mx-3 md:mx-28 lg:mx-28 xl:mx-32 mt-2 sm:mt-2 md:mt-8 lg:mt-8 xl:mt-10"
        style={{ backgroundColor: "#efefef", padding: "30px" }}
      >
        {blogData.highlightBlog && (
          <div 
            dangerouslySetInnerHTML={{ __html: blogData.highlightBlog }} 
            className="font-extrabold"
          />
        )}
      </div>
      <div 
        className="flex flex-col md:flex-row mx-3 sm:mx-3 md:mx-28 lg:mx-28 xl:mx-32 mt-4 sm:mt-4 md:mt-6 lg:mt-6 xl:mt-6" 
        ref={blogContainerRef}
      >
        <div className="md:w-1/2 pr-6 space-y-6">
          {blogData.description && (
            <div dangerouslySetInnerHTML={{ __html: blogData.description }} />
          )}
          {cleanBlogContent && (
            <div 
              dangerouslySetInnerHTML={{ __html: cleanBlogContent }} 
              className="space-y-1 custom-link-color" 
            />
          )}
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="sticky top-28 bg-[#EFEFEF] pt-6 px-4 h-auto overflow-hidden">
            <h2 className="text-lg font-bold text-[#212529] px-4">Recent Posts</h2>
            <div className="overflow-y-auto h-full">
              {blogData.recentPosts.length > 0 ? (
                blogData.recentPosts.map((recentPost, index) => (
                  <div
                    key={index}
                    className="mt-2 px-4"
                  >
                    <img src={recentPost.image} alt={recentPost.title} />
                    <div 
                      className="text-lg font-bold text-[#212529] mb-2 mt-2"
                      dangerouslySetInnerHTML={{__html: recentPost.blog_title}}
                    />
                    <p 
                      className="text-muted-foreground pb-4"
                      dangerouslySetInnerHTML={{__html: recentPost.description}}
                    />
                    <button
                      onClick={() => handleReadMore(recentPost)}
                      className="text-[13px] text-[#1a2e73] hover:text-blue-800 font-semibold"
                    >
                      Read More
                    </button>
                  </div>
                ))
              ) : (
                <div>No recent posts available</div>
              )}
              <div className="pb-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mb-6 sm:mb-6 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
      <Form/>
    </div>
  </>
  );
};

export default MainMarket;
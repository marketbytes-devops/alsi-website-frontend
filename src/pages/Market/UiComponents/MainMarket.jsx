import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Banner from "../../../components/UiComponents/Banner";
import Form from "../../../components/UiComponents/Form";

const MainMarket = () => {
  // const { blogSlug } = useParams();
  const [error, setError] = useState(null);
  const { state } = useLocation(); 
  const {
    image,
    description = "No Description Available",
    blogTitle = "No Title Available",
    currentDate = "No Date Available",
    currentTime = "No Time Available",
    highlightBlog = "No Highlights Available",
    blogContent = "No Content Available",
    recentPosts = [],
  } = state || {}; 

  useEffect(() => {
  }, [state]);

  if (error) {
    return <div>{error}</div>;
  }

  const currentBlogUrl = window.location.href;

  const blogContainerRef = useRef(null);

  return (
    <>
    <div className="container mb-6 sm:mb-6 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
      {image && (
        <Banner
          image={image}
          mainTitle={blogTitle}
          date={currentDate || "No date available"}
          time={currentTime || "No time available"}
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
        {highlightBlog && (
          <div dangerouslySetInnerHTML={{ __html: highlightBlog }} />
        )}
      </div>
      <div className="flex flex-col md:flex-row mx-3 sm:mx-3 md:mx-28 lg:mx-28 xl:mx-32 mt-4 sm:mt-4 md:mt-8 lg:mt-8 xl:mt-10" ref={blogContainerRef}>
        <div className="md:w-1/2 pr-6 space-y-6">
          {description && (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {blogContent && (
            <div dangerouslySetInnerHTML={{ __html: blogContent }} />
          )}
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="sticky top-28 bg-[#EFEFEF] pt-6 px-4 h-auto overflow-hidden">
            <h2 className="text-xl font-semibold text-[#212529] px-4">Recent Posts</h2>
            <div className="overflow-y-auto h-full">
              {recentPosts.length > 0 ? (
                recentPosts.map((recentPost, index) => (
                  <div
                    key={index}
                    className="mt-2 px-4"
                  >
                    <img src={recentPost.image} alt={recentPost.title} />
                    <div className="text-lg font-bold text-[#212529] mb-2 mt-2
                    " dangerouslySetInnerHTML={{__html: recentPost.blog_title}}/>
                    <p className="text-muted-foreground pb-4" dangerouslySetInnerHTML={{__html: recentPost.description}}/>
                    <Link 
                      to={{
                        pathname: `/market_updates/${recentPost.blog_slug}/`,
                        state: {
                          image: recentPost.image,
                          description: recentPost.description,
                          blogTitle: recentPost.blog_title,
                          currentDate: recentPost.date,
                          currentTime: recentPost.time,
                          highlightBlog: recentPost.intro || "No Highlights Available",
                          blogContent: recentPost.additional_content || "No Content Available",
                          recentPosts: recentPosts
                        }
                      }}
                      className="text-[13px] text-[#1a2e73] hover:text-blue-800 font-semibold"
                    >
                      Read More
                    </Link>
                  </div>
                ))
              ) : (
                <div>No recent posts available</div>
              )}
              <div className="pb-6">
              </div>
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

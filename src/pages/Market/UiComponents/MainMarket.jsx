import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postsData } from "../../../data/blogPost";
import Banner from "../../../components/UiComponents/Banner";

const MainMarket = () => {
  const { id } = useParams();
  const post = postsData.find((p) => p.id === id);

  const recentPostsRef = useRef(null);
  const blogContainerRef = useRef(null);

  useEffect(() => {
    const recentPostsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          blogContainerRef.current.classList.add("scrolling");
        } else {
          blogContainerRef.current.classList.remove("scrolling");
        }
      },
      {
        threshold: 0.8,
      }
    );

    recentPostsObserver.observe(recentPostsRef.current);

    return () => {
      recentPostsObserver.disconnect();
    };
  }, []);

  if (!post) {
    return <div>Post not found. Please check the link.</div>;
  }

  const currentBlogUrl = window.location.href; 

  return (
    <div className="container mx-auto">
      <Banner
        image={post.image}
        title={post.title}
        date={post.date || "No date available"}
        time={post.time || "No time available"}
        currentUrl={currentBlogUrl} 
        showSocialMedia={true}
      />
      <div
        className="mx-3 sm:mx-3 md:mx-28 lg:mx-28 xl:mx-32 mt-2 sm:mt-2 md:mt-8 lg:mt-8 xl:mt-10"
        style={{ backgroundColor: "#efefef", padding: "30px" }}
      >
        <h2 className="text-sm font-extrabold text-center">
          {post.additionalContent.intro}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row mx-3 sm:mx-3 md:mx-28 lg:mx-28 xl:mx-32 mt-4 sm:mt-4 md:mt-8 lg:mt-8 xl:mt-10">
        <div className="md:w-1/2 pr-6" ref={blogContainerRef}>
          <div>
            {post.additionalContent.details.map((detail, index) => (
              <div key={index}>
                {detail.image && (
                  <img
                    src={detail.image}
                    alt={detail.title}
                    className="w-full h-auto mb-4"
                  />
                )}
                <h2 className="mt-6 text-xl font-semibold text-primary">
                  {detail.title}
                </h2>
                {detail.points && Array.isArray(detail.points) && detail.points.length > 0 ? (
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    {detail.points.map((point, i) => (
                      <li key={i}>
                        <span>
                          {Array.isArray(point.text) ? (
                            point.text.map((part, j) =>
                              typeof part === "string" ? (
                                part
                              ) : (
                                <a key={j} href={part.url} className="text-blue-600">
                                  {part.text}
                                </a>
                              )
                            )
                          ) : (
                            <span>{point.text}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-muted-foreground">{detail.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="sticky top-20 bg-gray-200 p-6 h-auto overflow-hidden">
            <h2 className="text-xl font-semibold text-primary">Recent Posts</h2>
            <div ref={recentPostsRef} className="overflow-y-auto h-full">
              {post.recentPosts.map((recentPost, index) => (
                <div key={index} className="mt-4 bg-white p-4 space-y-4 rounded-lg shadow-md">
                  <img src={recentPost.image} alt={recentPost.title} />
                  <h3 className="text-lg font-bold text-secondary">{recentPost.title}</h3>
                  <p className="text-muted-foreground pb-4">{recentPost.description}</p>
                  <a href={recentPost.link} className="text-accent hover:underline">Read More</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMarket;

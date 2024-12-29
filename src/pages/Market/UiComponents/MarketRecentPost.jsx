import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import apiClient from "../../../api";
import Banner from "../../../components/UiComponents/Banner";

const MarketRecentPost = () => {
  const { slug } = useParams(); 
  const { state } = useLocation();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`market/blog-entry/${slug}`);
        setPost(response.data); 
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (!state) {
      fetchPost();
    } else {
      setPost(state);
    }
  }, [slug, state]); 

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-6 sm:mb-6 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
      {post.image && (
        <Banner
          image={post.image}
          mainTitle={post.blog_title}
          date={post.date}
          time={post.time}
        />
      )}
      <div className="content mt-4 sm:mt-4 md:mt-8 lg:mt-8 xl:mt-10">
        <h1 className="text-2xl font-semibold">{post.blog_title}</h1>
        <p>{post.description}</p>
        <div
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: post.blog_content }}
        />
      </div>
    </div>
  );
};

export default MarketRecentPost;

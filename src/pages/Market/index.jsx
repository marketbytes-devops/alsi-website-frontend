import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api";
import Banner from "../../components/UiComponents/Banner";
import Form from "../../components/UiComponents/Form";
import { Helmet } from "react-helmet-async";

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 12;
  const [postsData, setPostsData] = useState([]);
  const [title, setTitle] = useState("");
  const [blogBanner, setBlogBanner] = useState(null);
  const [entriesData, setEntriesData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("market/blog-banner/");
        setPostsData(response.data);
        setTitle(response.data[0]?.title || "");
        setBlogBanner(response.data[0].image || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await apiClient.get("market/blog-entries/");
        const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntriesData(sortedEntries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = entriesData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(entriesData.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReadMore = (
    blogSlug,
    blogImage,
    blogTitle,
    currentDate,
    currentTime,
    highlightBlog,
    blogContent,
    description
  ) => {
    if (!blogSlug) {
      return;
    }

    const selectedIndex = entriesData.findIndex(
      (entry) => entry.blog_slug === blogSlug
    );

    const recentPosts = [];
    for (let i = selectedIndex - 2; i <= selectedIndex + 1; i++) {
      if (i >= 0 && i < entriesData.length && i !== selectedIndex) {
        recentPosts.push(entriesData[i]);
      }
    }

    if (recentPosts.length < 3) {
      const additionalPosts = entriesData.filter(
        (entry, index) => !recentPosts.includes(entry) && index !== selectedIndex
      );

      for (let i = 0; recentPosts.length < 3 && i < additionalPosts.length; i++) {
        recentPosts.push(additionalPosts[i]);
      }
    }

    navigate(`/market-updates/${blogSlug}/`, {
      state: {
        image: blogImage,
        description: description || "No Description Available",
        blogTitle: blogTitle || "No Title Available",
        currentDate: currentDate || "No Date Available",
        currentTime: currentTime || "No Time Available",
        highlightBlog: highlightBlog || "No Highlights Available",
        blogContent: blogContent || "No Content Available",
        recentPosts: recentPosts.slice(0, 3),
      },
    });
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const rangeSize = 4;
    const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const endPage = Math.min(startPage + rangeSize - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-sm font-semibold rounded-sm ${i === currentPage ? "bg-[#009adb] text-white" : "bg-gray-200 text-[#0134b5]"
            } hover:bg-[#009adb] hover:text-white`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  function truncateText(text, limit) {
    if (typeof text !== "string") {
      return "";
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

  return (
    <>
      <Helmet>
        <title>Market Updates | ALSI Global</title>
        <meta
          name="description"
          content="Stay informed with our latest market updates for valuable insights and informed decisions."
        />
        <meta
          property="og:url"
          content="https://www.alsiglobal.com/market-updates"
        />
        <meta
          property="og:title"
          content=" Market Updates | ALSI Global"
        />
        <meta
          property="og:description"
          content="Stay informed with our latest market updates for valuable insights and informed decisions."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.alsiglobal.com/market-updates"
        />
      </Helmet>
      <div className="overflow-hidden">
        <Banner image={blogBanner} title={title} />
      </div>
      <div className="px-4 py-8 mx-6 mt-4 sm:mx-6 sm:mt-6 md:mx-20 md:mt-16 lg:mx-20 lg:mt-16">
        <div className="flex flex-wrap items-center justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 sm:grid-cols-1 gap-8">
            {currentPosts.map((post) => (
              <div key={post.id} className="w-auto h-auto bg-white hover:bg-gray-100 rounded-lg shadow-lg shadow-gray-300 hover:shadow-gray-400 hover:shadow-lg transition duration-300 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.blog_title}
                  className="w-full rounded-[15px] h-48 object-cover p-2"
                />
                <div className="p-4">
                  <h3 className="text-[#212529] text-lg font-bold mb-2" dangerouslySetInnerHTML={{
                    __html: truncateText(post.blog_title, 59),
                  }} />
                  <div
                    className="text-[#212529] font-medium text-sm mb-4"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(post.description, 58),
                    }}
                  />
                  <button
                    className="read-more-btn"
                    onClick={() => handleReadMore(post.blog_slug, post.image, post.main_title, post.date, post.time, post.intro, post.additional_content, post.description)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 sm:mt-4 pt-8 md:my-10 lg:my-10">
          <button
            onClick={handlePrevious}
            className="bg-[#0134b5] text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#009adb]"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex">
            {getPaginationButtons()}
          </div>
          <button
            onClick={handleNext}
            className="bg-[#0134b5] text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#009adb]"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mb-6 sm:mb-6 md:mb-10 lg:mb-10 mt-4 sm:mt-4 md:mt-0 lg:mt-0">
        <Form />
      </div>
    </>
  );
};

export default Market;


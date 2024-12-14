import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import blogBanner from "../../assets/images/Market/market.webp";
import apiClient from "../../api";
import Banner from "../../components/UiComponents/Banner";

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();  
  const postsPerPage = 12;
  const [postsData, setPostsData] = useState([]); 
  const [title, setTitle] = useState("");
  const [blogBanner, setBlogBanner] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("blog/posts/"); 
        setPostsData(response.data);
        setTitle(response.data[0]?.title || ""); 
        setBlogBanner(response.data[0].image || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postsData.length / postsPerPage);

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

  const handleReadMore = (id, title, image) => {
    navigate(`/market_updates/${id}`);
  };  

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

  const getPaginationButtons = () => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-sm font-semibold rounded-sm ${i === currentPage ? "bg-[#009adb] text-white" : "bg-gray-200 text-[#0134b5]"} hover:bg-[#009adb] hover:text-white`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="overflow-hidden">
        <Banner image={blogBanner} title={title} />
      </div>
      <div className="px-4 py-8 mx-6 mt-4 sm:mx-6 sm:mt-6 md:mx-20 md:mt-16 lg:mx-20 lg:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg shadow-gray-300 hover:shadow-gray-400 hover:shadow-lg transition duration-300 overflow-hidden"
            >
              {post.entries && post.entries.length > 0 ? (
                post.entries.map((entry) => (
                  <div key={entry.id}>
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full rounded-[15px] h-48 object-cover p-2"
                    />
                    <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
                      <p className="text-gray-700 font-medium text-sm mb-4">
                        {truncateDescription(entry.description)}
                      </p>
                      <button
                          className="read-more-btn"
                          onClick={() => handleReadMore(post.id, entry.title, entry.image)}  
                        >
                          Read More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500">No entries available</div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 sm:mt-12 md:mt-12 lg:mt-8">
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
    </>
  );
};

export default Market;

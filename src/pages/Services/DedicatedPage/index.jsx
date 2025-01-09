import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Banner from "../../../components/UiComponents/Banner";
import Services from "../../../components/UiComponents/Services";
import Form from "../../../components/UiComponents/Form";
import Industries from "../../../components/UiComponents/Industries";
import apiClient from "../../../api";
import BackgroundRepeat from "../../../components/BackgroundRepeat";
import "./styles.css";

const DedicatedPage = () => {
  const { name: link_url } = useParams();
  const { state } = useLocation();
  const [subcategories, setSubcategories] = useState([]);

  const {
    banner_image,
    service_title = "No Title Available",
    content_paragraphs = "No Content Available",
  } = state || {};

  const currentServiceUrl = window.location.href;

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (link_url) {
        try {
          const response = await apiClient.get(`service/services/${link_url}/`);
          const fetchedSubcategories = response.data.subcategories || [];
          
          const updatedSubcategories = fetchedSubcategories.map((category) => {
            if (category.enable_fill_empty_cards) {
              const cardCount = category.cards?.length || 0;
              const remaining = 8 - (cardCount % 8);
              if (remaining > 0 && remaining < 8) {
                for (let i = 0; i < remaining; i++) {
                  category.cards.push({
                    id: `empty-${category.id}-${i}`, 
                    title: "",
                    image: "", 
                  });
                }
              }
            }
            return category;
          });

          setSubcategories(updatedSubcategories);
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        }
      }
    };

    fetchSubcategories();
  }, [link_url]);

  const totalCards = subcategories.reduce(
    (sum, category) => sum + (category.cards?.length || 0),
    0
  );

  const backgroundRepeatCount = Math.ceil(totalCards / 8);

  return (
    <>
      <div className="flex flex-grow">
        <Banner
          image={banner_image}
          mainTitle={service_title}
          currentUrl={currentServiceUrl}
          showMainTitle={true}
        />
      </div>

      <div className="px-4 sm:px-4 md:px-28 lg:px-28 xl:px-28 space-y-4 my-12">
        {content_paragraphs && (
          <div dangerouslySetInnerHTML={{ __html: content_paragraphs }} />
        )}
      </div>

      <div className="relative bottom-4">
        <div className="hidden sm:hidden md:block lg:block xl:block -z-10 absolute w-full mx-auto">
          <BackgroundRepeat count={backgroundRepeatCount} />
        </div>
        {subcategories.length > 0 ? (
          subcategories.map((category) => (
            <div
              key={category.id}
              className="w-full px-4 sm:px-4 md:px-28 lg:px-28"
            >
              <div className="my-8">
                <div
                  className="text-4xl font-extrabold"
                  style={{ color: category.text_color || "#212529" }}
                  dangerouslySetInnerHTML={{ __html: category.title }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-28">
                {category.cards.map((card) => (
                  <div
                      key={card.id}
                      className={`${
                        card.title
                          ? "bg-gray-100 text-[#212529] rounded-md shadow-md hover:shadow-lg overflow-hidden hover:scale-[1.02] duration-300 transition-all p-4"
                          : "invisible"
                      }`}
                    >
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    )}
                    {card.title && (
                      <div className="pt-4">
                        <div
                          className="text-lg font-semibold"
                          dangerouslySetInnerHTML={{ __html: card.title }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No subcategories available</div>
        )}
      </div>

      <div className="mt-10">
        <Services initialTitle="Other Services" />
      </div>

      <div className="space-y-4 my-12">
        <Industries />
      </div>

      <div className="my-12">
        <Form />
      </div>
    </>
  );
};

export default DedicatedPage;

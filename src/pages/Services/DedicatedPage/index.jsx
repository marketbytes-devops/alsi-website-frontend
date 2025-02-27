import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
  const [serviceDetails, setServiceDetails] = useState({
    banner_image: '',
    service_title: "No Title Available",
    content_paragraphs: "No Content Available",
  });
  const [subcategories, setSubcategories] = useState([]);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const {

  } = state || {};

  const currentServiceUrl = window.location.href;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        if (link_url) {
          const response = await apiClient.get(`service/services/${link_url}/`);
          const serviceData = response.data;

          setServiceDetails({
            banner_image: serviceData.banner_image || '',
            service_title: serviceData.service_title || "No Title Available",
            content_paragraphs: serviceData.content_paragraphs || "No Content Available",
          });
        }
      } catch (error) {
        console.error("Failed to fetch service details:", error);
      }
    };

    if (!state || !state.service_title) {
      fetchServiceDetails();
    } else {
      setServiceDetails({
        banner_image: state.banner_image || '',
        service_title: state.service_title || "No Title Available",
        content_paragraphs: state.content_paragraphs || "No Content Available",
      });
    }
  }, [link_url, state]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (link_url) {
        try {
          const response = await apiClient.get(`service/services/${link_url}/`);
          const fetchedSubcategories = response.data.subcategories || [];

          const updatedSubcategories = fetchedSubcategories.map((category) => {
            if (isDesktop && category.enable_fill_empty_cards) {
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

            category.cards = category.cards.sort((a, b) => {
              if (a.title && b.title) {
                return a.title.length - b.title.length;
              }
              return 0;
            });

            return category;
          });

          setSubcategories(updatedSubcategories);
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        }
      }
    };

    fetchSubcategories();
  }, [link_url, isDesktop]);

  const totalCards = subcategories.reduce(
    (sum, category) => sum + (category.cards?.length || 0),
    0
  );

  const backgroundRepeatCount = Math.ceil(totalCards / 8);

  const adjustTextColor = (color) => {
    const whiteColors = ["white", "#fff", "#ffffff"];
    return isMobile && whiteColors.includes(color?.toLowerCase())
      ? "#000"
      : color;
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <>
    <Helmet>
        <title>{stripHtmlTags(serviceDetails.service_title)} | ALSI Global</title>
        <meta name="description" content={stripHtmlTags(serviceDetails.content_paragraphs).substring(0, 150)} />
        <meta property="og:title" content={stripHtmlTags(serviceDetails.service_title)} />
        <meta property="og:description" content={stripHtmlTags(serviceDetails.content_paragraphs).substring(0, 150)} />
        <meta property="og:url" content={stripHtmlTags(currentServiceUrl)} />
        <meta property="og:image" content={serviceDetails.banner_image} />
      </Helmet>
      <div className="flex flex-grow">
        <Banner
          image={serviceDetails.banner_image}
          mainTitle={serviceDetails.service_title}
          currentUrl={currentServiceUrl}
          showMainTitle={true}
        />
      </div>

      <div className="px-4 sm:px-4 md:px-28 lg:px-28 xl:px-28 space-y-4 my-4 sm:my-4 md:my-12 lg:my-12 xl:my-12">
        {serviceDetails.content_paragraphs && (
          <div dangerouslySetInnerHTML={{ __html: serviceDetails.content_paragraphs }} />
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
                  style={{ color: adjustTextColor(category.text_color || "#212529") }}
                  dangerouslySetInnerHTML={{ __html: category.title }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 sm:gap-y-8 md:gap-y-28 lg:gap-y-28 xl:gap-y-28">
                {category.cards.map((card) => (
                  <div
                    key={card.id}
                    className={`${card.title
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
        <Services forceTitle="Other Services" excludeService={link_url} />
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

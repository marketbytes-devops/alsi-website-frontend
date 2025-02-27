import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; 
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import apiClient from "../../../api";
import Banner from "../../../components/UiComponents/Banner";
import BackgroundRepeat from "../../../components/BackgroundRepeat";
import LottieLoader from "../../../components/LottieLoader";

const SpecializedDedicatedPage = () => {
  const { link_url } = useParams();
  const [specializedService, setSpecializedService] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const cleanLinkUrl = link_url.replace(/^\uFEFF/, "");

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const currentServiceUrl = window.location.href; 

  useEffect(() => {
    const fetchSpecializedService = async () => {
      try {
        const response = await apiClient.get(
          `service/specialized-entries/${cleanLinkUrl}`
        );
        const serviceData = response.data;
        setSpecializedService(serviceData);

        if (serviceData.subcategories && serviceData.subcategories.length > 0) {
          const processedSubcategories = serviceData.subcategories.map((category) => {
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
            return category;
          });

          setSubcategories(processedSubcategories);
        }
      } catch (error) {
        console.error("Error fetching specialized service:", error);
      }
    };

    fetchSpecializedService();
  }, [cleanLinkUrl, isDesktop]);

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
    return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
  };

  return (
    <div>
      {specializedService ? (
        <>
          <Helmet>
            <title>{stripHtmlTags(specializedService.dedicated_title)} | ALSI Global</title>
            <meta
              name="description"
              content={stripHtmlTags(specializedService.dedicated_paragraph).substring(0, 150)}
            />
            <meta
              property="og:url"
              content={currentServiceUrl}
            />
            <meta
              property="og:title"
              content={stripHtmlTags(specializedService.dedicated_title)}
            />
            <meta
              property="og:description"
              content={stripHtmlTags(specializedService.dedicated_paragraph).substring(0, 150)}
            />
            <meta
              property="og:image"
              content={specializedService.dedicated_image}
            />
            <meta property="og:type" content="website" />
            <link
              rel="canonical"
              href={currentServiceUrl}
            />
          </Helmet>
          <Banner
            title={specializedService.dedicated_title}
            image={specializedService.dedicated_image}
          />
          <div className="my-4 sm:my-4 md:my-10 lg:my-10 xl:my-10 md:mx-28 lg:mx-28 mx-4 sm:mx-4 py-8 text-[#212529]">
            {specializedService.dedicated_paragraph && (
              <div
                dangerouslySetInnerHTML={{
                  __html: specializedService.dedicated_paragraph,
                }}
              />
            )}
          </div>
        </>
      ) : (
        <LottieLoader />
      )}

      {subcategories.length > 0 ? (
        <div className="relative bottom-4 mb-4 sm:mb-4 md:mb-8 lg:mb-8 xl:mb-8">
          <div className="hidden sm:hidden md:block lg:block xl:block -z-10 absolute w-full mx-auto">
            <BackgroundRepeat count={backgroundRepeatCount} />
          </div>
          {subcategories.map((category) => (
            <div key={category.id} className="w-full px-4 sm:px-4 md:px-28 lg:px-28">
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
          ))}
        </div>
      ) : (
        <div className="-mb-8"></div>
      )}
    </div>
  );
};

export default SpecializedDedicatedPage;
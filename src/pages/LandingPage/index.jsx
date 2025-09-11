import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Banner from "../../components/UiComponents/Banner";
import landingImage from "../../assets/images/Landing/banner.webp";
import courierImage from "../../assets/images/Landing/courier.webp";
import landingData from "./landingData.js";
import pickupImg from "../../assets/images/Landing/packing.webp";
import deliveryImg from "../../assets/images/Landing/delivery.webp";
import expertImg from "../../assets/images/Landing/expert.webp";
import handlingImg from "../../assets/images/Landing/handling.webp";
import exchangeImg from "../../assets/images/Landing/exchange.webp";
import serveImg from "../../assets/images/Landing/serve.webp";
import accordianImg from "../../assets/images/Landing/accordian.webp";
import GetQuoteForm from "../../components/UiComponents/Form/GetQuoteForm.js";

const LandingPage = () => {
  const {
    header,
    services,
    additionalSections,
    freightServices,
    customsClearance,
    shippingServices,
    whoWeServe,
    industrySolutions,
    faq,
  } = landingData;

  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Door to Door Courier and Cargo Services | Qatar to Jordan</title>
        <meta
          name="description"
          content="Fast and reliable door to door courier and cargo services from Qatar to Jordan. Safe shipping, customs support, real-time tracking, pickup and timely delivery at your doorstep."
        />
        <meta
          name="keywords"
          content="
            Door to Door Courier and Cargo Services from Qatar to Jordan,
            courier service from Qatar to Jordan,
            cargo service from Qatar to Jordan,
            shipping from Qatar to Jordan,
            freight from Qatar to Jordan,
            express courier from Qatar to Jordan,
            international courier Qatar to Jordan,
            Qatar to Jordan delivery service,
            freight forwarding Qatar to Jordan,
            send package from Qatar to Jordan,
            customs clearance Qatar to Jordan,
            parcel delivery Qatar to Jordan,
            real-time tracking,
            logistics company in Qatar,
            cargo handling,
            pickup and delivery service,
            packaging and shipping,
            air freight Qatar to Jordan,
            road freight from Qatar to Jordan,
            sea freight to Jordan,
            civil defense approved transportation,
            project cargo logistics,
            commercial cargo service,
            fast and secure courier service,
            affordable international shipping,
            door to door delivery Qatar Jordan
          "
        />
        <link
          rel="canonical"
          href="https://www.alsiglobal.com/courier-and-cargo-services-from-qatar-to-jordan"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take for a door to door courier and cargo services from Qatar to Jordan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Delivery time depends on the shipping method. Express air courier takes 4 to 8 or 6 to 12 business days."
                }
              },
              {
                "@type": "Question",
                "name": "What items can I send from Qatar to Jordan using your courier service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can send documents, electronics, household items, clothing, industrial goods, automotive parts, machinery, and more. We also handle restricted cargo with proper documentation and permits."
                }
              },
              {
                "@type": "Question",
                "name": "Are your courier services from Qatar to Jordan insured?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer shipment insurance options to protect your goods against loss, theft, or damage. Coverage depends on your cargo value and shipping mode."
                }
              },
              {
                "@type": "Question",
                "name": "How can I track my shipment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Once your shipment is booked, you will receive a tracking number and link. You can track your parcel online in real-time or contact our support team for updates."
                }
              },
              {
                "@type": "Question",
                "name": "What is the cost of shipping from Qatar to Jordan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The cost is influenced by the goods' dimensions, weight, shipping method, and delivery location. For a quote that is specific to your shipment, get in touch with us."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Banner bgImage={landingImage} />
      <section className="relative w-full bg-[#125194] text-white py-6 sm:py-10">
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-0 items-start">
          <h1
            className="text-xl sm:text-4xl font-semibold text-center md:text-left px-0 sm:px-8"
            dangerouslySetInnerHTML={{ __html: header.title }}
          />
          <div className="text-center md:text-start">
            <p className="mb-4 sm:mb-6 leading-relaxed">{header.description}</p>
            <button
              className="bg-white text-[#125194] font-normal py-2 px-4 sm:px-6 rounded-full hover:bg-gray-200 transition duration-300 text-sm sm:text-base"
              onClick={openModal}
            >
              {header.buttonText}
            </button>
          </div>
        </div>
      </section>
      <section className="mt-4 sm:mt-4 md:mt-20 lg:mt-20 mx-4 sm:mx-4 md:mx-28 lg:mx-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div>
            <img
              src={courierImage}
              alt={services.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            {services.sections.map((section, index) => (
              <div key={index}>
                {section.headingLevel === "h3" ? (
                  <h3 className="text-lg sm:text-xl font-medium mb-2 text-[#125194]">
                    {section.title}
                  </h3>
                ) : (
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-[#125194]">
                    {section.title}
                  </h2>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#125194] mt-4 sm:mt-4 md:mt-20 lg:mt-20">
        <div className="m-4 sm:m-4 md:m-28 lg:m-28 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {additionalSections.map((section, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={index === 0 ? pickupImg : deliveryImg}
                alt={section.imageAlt}
                className="w-full h-auto object-cover mb-4"
              />
              <div>
                <h4
                  className="text-xl sm:text-2xl font-semibold mb-2 text-[#ffffff]"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
                <p className="text-[#ffffffcc] leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 sm:mt-4 md:mt-20 lg:mt-20 mx-4 sm:mx-4 md:mx-28 lg:mx-28">
        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="text-xl md:text-4xl font-bold text-[#125194] mb-6"
              dangerouslySetInnerHTML={{ __html: freightServices.title }}
            />
            <p className="text-gray-700 max-w-5xl mx-auto text-lg">
              {freightServices.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {freightServices.cards.map((card, index) => (
              <div
                key={index}
                className="relative h-auto sm:h-[550px] bg-[#125194] text-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                  <p className="mb-4">{card.description}</p>
                  <ul className="list-disc pl-5 space-y-2 mb-0 sm:mb-6">
                    {card.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="pl-6 pb-6 block sm:hidden">
                  <a
                    href={card.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#125194] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {card.buttonText}
                  </a>
                </div>
                <div className="hidden sm:block absolute bottom-8 left-6">
                  <a
                    href={card.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#125194] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"

                  >
                    {card.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#125194] mt-4 sm:mt-4 md:mt-20 lg:mt-20">
        <div className="mx-4 sm:mx-4 md:mx-28 lg:mx-28 py-4 sm:py-20">
          <div className="text-center">
            <h2
              className="text-xl md:text-4xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: customsClearance.title }}
            />
            <p className="text-[#ffffffcc] max-w-6xl mx-auto text-lg">
              {customsClearance.paragraph}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 sm:mt-20">
            {customsClearance.sections.map((section, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  src={index === 0 ? expertImg : handlingImg}
                  alt={section.imageAlt}
                  className="w-full h-auto object-cover mb-4"
                />
                <div>
                  <h4
                    className="text-xl sm:text-2xl font-semibold mb-2 text-[#ffffff]"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                  <p className="text-[#ffffffcc] leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-auto mx-4 sm:mx-4 md:mx-28 lg:mx-28 mt-4 sm:mt-4 md:mt-20 lg:mt-20">
        <div className="mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
            <div className="w-full md:w-1/2">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={exchangeImg}
                  alt={shippingServices.imageAlt}
                  className="w-full h-auto md:h-[600px] object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4 sm:space-y-8 flex flex-col justify-center">
              {shippingServices.features.map((feature, index) => (
                <div key={index}>
                  {feature.headingLevel === "h4" ? (
                    <h4 className="text-lg sm:text-xl font-medium text-[#125194] mb-4">
                      {feature.title}
                    </h4>
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#125194] mb-4">
                      {feature.title}
                    </h2>
                  )}
                  {feature.title === "Who We Serve – Personalized and Commercial Cargo Solutions" ? (
                    <>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {feature.description
                          .split('\n')
                          .filter(line => line.startsWith('-'))
                          .map((item, idx) => (
                            <li key={idx}>{item.replace('- ', '')}</li>
                          ))}
                      </ul>
                      <p className="text-gray-700 mt-4">
                        {feature.description.split('\n').find(line => !line.startsWith('-') && line.trim() !== '')}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-700">{feature.description}</p>
                  )}
                </div>
              ))}
              <button
                className="bg-[#125194] text-white font-normal py-2 px-4 sm:px-6 rounded-full hover:bg-[#125194]/80 transition duration-300 text-sm sm:text-base"
                onClick={openModal}
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-full bg-[#125194] text-white mt-4 sm:mt-4 md:mt-20 lg:mt-20">
        <div className="mx-4 sm:mx-4 md:mx-28 lg:mx-28 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="py-4 sm:py-20">
              <h2
                className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8"
                dangerouslySetInnerHTML={{ __html: whoWeServe.title }}
              />
              <ul className="space-y-4 text-lg">
                {whoWeServe.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-2xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          <div className="md:w-1/2 flex items-center justify-center -mt-4 sm:-mt-0 pb-4 sm:pb-0">
            <div className="relative w-full h-full bg-gray-200 overflow-hidden">
              <img
                src={serveImg}
                className="w-full h-full object-cover"
                alt={whoWeServe.imageAlt}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mx-6 md:mx-28 mt-4 sm:mt-4 md:mt-20 lg:mt-20">
        <div className="space-y-4 sm:space-y-8 text-gray-800">
          {industrySolutions.blocks.map((block, index) => (
            <div key={index}>
              <h4
                className="text-xl sm:text-2xl font-semibold text-[#125194] mb-3"
                dangerouslySetInnerHTML={{ __html: block.title }}
              />
              <p>{block.description}</p>
            </div>
          ))}
          <button
            className="bg-[#125194] text-white font-normal py-2 px-4 sm:px-6 rounded-full hover:bg-[#125194]/80 transition duration-300 text-sm sm:text-base"
            onClick={openModal}
          >
            Contact Us
          </button>
        </div>
      </section>

      <section className="min-h-auto bg-[#125194] text-white mt-4 sm:mt-4 md:mt-20 lg:mt-20 mb-2 sm:mb-2 md:mb-14 lg:mb-14">
        <div className="mx-4 sm:mx-4 md:mx-28 lg:mx-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
            <div className="lg:w-1/2 py-4 sm:py-20 flex flex-col justify-center">
              <div className="space-y-4 h-full">
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white mb-8"
                  dangerouslySetInnerHTML={{ __html: faq.title }}
                />
                {faq.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-400 pb-4">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-start items-center w-full text-left focus:outline-none"
                    >
                      <motion.span
                        className="text-2xl"
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {activeIndex === index ? "−" : "+"}
                      </motion.span>
                      <h3 className="text-xl font-semibold pl-4">{item.question}</h3>
                    </button>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-2 text-blue-100 overflow-hidden"
                        >
                          <p className="pl-8">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 flex items-stretch pb-4 sm:pb-0">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={accordianImg}
                  className="w-full h-full object-cover"
                  alt={faq.imageAlt}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 backdrop-brightness-50"
            onClick={closeModal}
          ></div>
          <div className="relative rounded-xl shadow-lg w-full max-w-md mx-auto z-50 bg-transparent">
            <button
              className="absolute top-4 right-4 text-gray-100 hover:text-gray-200 transition duration-300 border-[3px] border-gray-100 hover:border-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} size="md" />
            </button>
            <GetQuoteForm />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
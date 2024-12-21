import React from "react";
import PropTypes from "prop-types";
import facebook from "../../assets/images/SocialMediaIcons/facebook.webp";
import instagram from "../../assets/images/SocialMediaIcons/instagram.webp";
import linkedin from "../../assets/images/SocialMediaIcons/linkedin.webp";
import twitter from "../../assets/images/SocialMediaIcons/twitter.webp";
import link from "../../assets/images/SocialMediaIcons/link.webp";
import more from "../../assets/images/SocialMediaIcons/more.webp";
import { useSocialLinks } from "../../hooks/useSocialLinks";

const Banner = ({ image, title, date, time, currentUrl, showSocialMedia }) => {
  const socialLinks = useSocialLinks();
  
  const socialMedia = [
    { icon: facebook, url: socialLinks.facebook, external: true },
    { icon: instagram, url: socialLinks.instagram, external: true },
    { icon: linkedin, url: socialLinks.linkedin, external: true },
    { icon: twitter, url: socialLinks.twitter, external: true },
    {
      icon: link,
      onClick: (currentUrl) => {
        navigator.clipboard.writeText(currentUrl)
          .then(() => alert("URL copied to clipboard!"))
          .catch(err => console.error("Failed to copy: ", err));
      },
    },
    {
      icon: more,
      onClick: (currentUrl) => {
        if (navigator.share) {
          navigator.share({ title: document.title, url: currentUrl })
            .then(() => console.log("Share successful"))
            .catch(err => console.error("Share failed: ", err));
        } else {
          alert("Sharing is not supported on this browser.");
        }
      },
    },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
      <div
        className="w-full h-full object-cover bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image?.startsWith("http") ? image : `http://127.0.0.1:8000${image}`})`,
        }}
      ></div>
      <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full mx-auto px-8">
        <div dangerouslySetInnerHTML={{ __html: title}} className="text-2xl sm:text-2xl md:text-6xl lg:text-6xl font-bold"/>
      </div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <p>
          <span dangerouslySetInnerHTML={{__html: date}}/>
          <span dangerouslySetInnerHTML={{__html: time}}/>
        </p>
      </div>
      {showSocialMedia && (
        <div className="absolute bottom-0 right-0 p-4 flex space-x-4">
          {socialMedia.map(({ icon, url, onClick, external }, index) => (
            <a
              key={index}
              href={external ? url : undefined}
              target="_blank"
              onClick={(e) => {
                if (!external) {
                  e.preventDefault();
                  onClick(currentUrl);
                }
              }}
              className="hover:scale-110 transition duration-300"
              title={icon === link ? "Copy URL" : icon === more ? "Share this page" : ""}
            >
              <img src={icon} alt="Social Media Icon" className="h-4 w-4 cursor-pointer" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

Banner.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
  currentUrl: PropTypes.string.isRequired,
  showSocialMedia: PropTypes.bool,
};

export default Banner;

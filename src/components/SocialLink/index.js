import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin, faPinterest, faThreads, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useSocialLinks } from '../../hooks/useSocialLinks';
import LottieLoader from '../LottieLoader';


const SocialLink = ({ className }) => {
  const socialLinks = useSocialLinks();

  if (!socialLinks || !socialLinks.facebook) {
    return <div><LottieLoader/></div>; 
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebookF} size="sm" />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} size="sm" />
      </a>
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} size="sm" />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FontAwesomeIcon icon={faXTwitter} size="sm" />
      </a>
      <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
        <FontAwesomeIcon icon={faPinterest} size="sm" />
      </a>
      <a href={socialLinks.thread} target="_blank" rel="noopener noreferrer" aria-label="Threads">
        <FontAwesomeIcon icon={faThreads} size="sm" />
      </a>
      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
        <FontAwesomeIcon icon={faYoutube} size="sm" />
      </a>
    </div>
  );
};

export default SocialLink;

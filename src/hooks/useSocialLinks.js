import { useEffect, useState } from 'react';
import apiClient from '../api';

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    apiClient.get('social-media/social-media-entries/')
      .then(response => {
        setSocialLinks(response.data[0]); 
      })
      .catch(error => console.error('Error fetching social links:', error));
  }, []);

  return socialLinks;
};
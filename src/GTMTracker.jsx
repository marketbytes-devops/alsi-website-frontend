import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

export default GTMTracker;
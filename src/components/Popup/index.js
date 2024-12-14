import React, { useState } from 'react';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="uae-hover-popup" style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="popup-content">
        <h3>Dummy Content</h3>
        <p>This is dummy content for the UAE hover popup.</p>
      </div>
    </div>
  );
};

export default Popup;

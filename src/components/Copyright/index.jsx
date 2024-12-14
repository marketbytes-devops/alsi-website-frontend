import React from 'react';

const Copyright = ({ fontSize, fontWeight, textColor }) => {
  return (
    <p
      className={`${fontWeight ? `font-${fontWeight}` : ""} ${textColor ? `${textColor}` : ""}`}
      style={{ fontSize: fontSize ? fontSize : "inherit" }}
    >
      © ALSI Global LLC {new Date().getFullYear()}, All Rights Reserved.
    </p>
  );
};

export default Copyright;

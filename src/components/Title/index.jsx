import React from "react";

const Title = ({ title, subtitle, color = "black" }) => {
  return (
    <>
      <h2
        style={{ color: color }} 
        className="mb-4 text-center" 
        dangerouslySetInnerHTML={{ __html: title }} 
      />
      <p 
        style={{ color: color }} 
        className="px-8 sm:px-8 md:px-0 lg:px-0" 
        dangerouslySetInnerHTML={{ __html: subtitle }} 
      />
    </>
  );
};

export default Title;

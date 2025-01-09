import React from 'react';
import bgImg from '../../assets/images/Services/service-main-bg.webp';

const BackgroundRepeat = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='relative w-full top-[230px]'>
          <div
            style={{
              backgroundImage: `url(${bgImg})`,
              height: "450px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="py-[165px]"></div>
        </div>
      ))}
    </>
  );
};

export default BackgroundRepeat;

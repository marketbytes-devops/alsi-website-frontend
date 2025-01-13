import React from 'react';
import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/images/Error/404.webp";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="h-screen w-full"
      id="error-page"
      style={{
        backgroundImage: `url(${errorImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className='text-white'>
        <h1 className="text-3xl font-medium mb-4">Oops! Page Not Found</h1>
        <p className="text-9xl font-bold mb-4">404</p>
        <p className="text-lg mb-8">
          Sorry!! The Page You Are Looking For Does Not Exist
        </p>
        <Link
          to="/"
          className="text-white bg-blue-600 px-4 py-2 hover:bg-blue-700 rounded-xs transition-all duration-300"
        >
          Back To Home Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

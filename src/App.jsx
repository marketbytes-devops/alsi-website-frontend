import React, { useState, useEffect, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Add this
import Layout from "./components/Layout";
import LottieLoader from "./components/LottieLoader";

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const OurNetwork = lazy(() => import("./pages/Network"));
const DedicatedPage = lazy(() => import("./pages/Services/DedicatedPage"));
const Industries = lazy(() => import("./pages/Industries"));
const MarketUpdates = lazy(() => import("./pages/Market"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ContactUs = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Career"));
const GalleryDedicatedPage = lazy(() => import("./pages/Gallery/DedicatedPage"));
const MainMarket = lazy(() => import("./pages/Market/UiComponents/MainMarket"));
const SpecializedSetup = lazy(() => import("./pages/Services/UiComponents/SpecializedSetup"));
const SpecializedDedicatedPage = lazy(() => import("./pages/Services/UiComponents/SpecializedDedicatedPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Suspense fallback={<LottieLoader />}><ErrorPage /></Suspense>,
    children: [
      { path: "/", element: <Suspense fallback={<LottieLoader />}><Home /></Suspense> },
      { path: "/about-us", element: <Suspense fallback={<LottieLoader />}><About /></Suspense> },
      {
        path: "/services",
        children: [
          { path: ":name", element: <Suspense fallback={<LottieLoader />}><DedicatedPage /></Suspense> },
          { path: "specialized-services", element: <Suspense fallback={<LottieLoader />}><SpecializedSetup /></Suspense> },
          { path: "specialized-services/:link_url", element: <Suspense fallback={<LottieLoader />}><SpecializedDedicatedPage /></Suspense> },
        ],
      },
      { path: "/our-network", element: <Suspense fallback={<LottieLoader />}><OurNetwork /></Suspense> },
      { path: "/industries", element: <Suspense fallback={<LottieLoader />}><Industries /></Suspense> },
      { path: "/market-updates", element: <Suspense fallback={<LottieLoader />}><MarketUpdates /></Suspense> },
      { path: "/market-updates/:blogSlug", element: <Suspense fallback={<LottieLoader />}><MainMarket /></Suspense> },
      { path: "/gallery", element: <Suspense fallback={<LottieLoader />}><Gallery /></Suspense> },
      { path: "/gallery/:name", element: <Suspense fallback={<LottieLoader />}><GalleryDedicatedPage /></Suspense> },
      { path: "/contact-us", element: <Suspense fallback={<LottieLoader />}><ContactUs /></Suspense> },
      { path: "/careers", element: <Suspense fallback={<LottieLoader />}><Careers /></Suspense> },
    ],
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <HelmetProvider>
      <Suspense fallback={<LottieLoader />}>
        {loading ? <LottieLoader /> : <RouterProvider router={router} />}
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
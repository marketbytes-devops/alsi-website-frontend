import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import About from "./pages/About";
import OurNetwork from "./pages/Network";
import DedicatedPage from "./pages/Services/DedicatedPage";
import Industries from "./pages/Industries";
import MarketUpdates from "./pages/Market";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/Contact";
import Careers from "./pages/Career";
import GalleryDedicatedPage from "./pages/Gallery/DedicatedPage";
import MainMarket from "./pages/Market/UiComponents/MainMarket";
import SpecializedSetup from "./pages/Services/UiComponents/SpecializedSetup";
import SpecializedDedicatedPage from "./pages/Services/UiComponents/SpecializedDedicatedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about_us", element: <About /> },
      {
        path: "/services",
        children: [
          { path: ":name", element: <DedicatedPage /> },
          { path: "specialized_services", element: <SpecializedSetup /> },
          { path: "specialized_services/:link_url", element: <SpecializedDedicatedPage /> }
        ],
      },
      { path: "/our_network", element: <OurNetwork /> },
      { path: "/industries", element: <Industries /> },
      {
        path: "/market_updates",
        element: <MarketUpdates />,
      },
      {
        path: "/market_updates/:blogSlug",
        element: <MainMarket />,
      },
      { path: "/gallery", element: <Gallery /> },
      {
        path: "/gallery/:name",
        element: <GalleryDedicatedPage />,
      },
      { path: "/contact_us", element: <ContactUs /> },
      { path: "/careers", element: <Careers /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

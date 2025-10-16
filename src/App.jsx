import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
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
import LandingPage from "./pages/LandingPage";
import Turkey from "./pages/LandingPage/Turkey";
import Israel from "./pages/LandingPage/Israel";
import Singapore from "./pages/LandingPage/Singapore";
import Thailand from "./pages/LandingPage/Thailand";
import Indonesia from "./pages/LandingPage/Indonesia";
import Malaysia from "./pages/LandingPage/Malaysia";
import Brazil from "./pages/LandingPage/Brazil";
import Bahrain from "./pages/LandingPage/Bahrain";
import Cambodia from "./pages/LandingPage/Cambodia";
import Armenia from "./pages/LandingPage/Armenia";
import Belgium from "./pages/LandingPage/Belgium";
import Italy from "./pages/LandingPage/Italy";
import Kuwait from "./pages/LandingPage/Kuwait";
import Austria from "./pages/LandingPage/Austria";
import Kenya from "./pages/LandingPage/Kenya";
import Australia from "./pages/LandingPage/Australia";
import Portugal from "./pages/LandingPage/Portugal";
import Myanmar from "./pages/LandingPage/Myanmar";
import France from "./pages/LandingPage/France";
import Philippines from "./pages/LandingPage/Philippines";
import Morocco from "./pages/LandingPage/Morocco";
import India from "./pages/LandingPage/India";
import Bangladesh from "./pages/LandingPage/Bangladesh";
import Albania from "./pages/LandingPage/Albania";
import Colombia from "./pages/LandingPage/Colombia";
import Chile from "./pages/LandingPage/Chile";
import DubaiToAlgeria from "./pages/LandingPage/DubaiToAlgeria";
import SaudiToBahamas from "./pages/LandingPage/Bahamas";
import OmanToBelarus from "./pages/LandingPage/OmanToBelarus";
import QatarToBarbados from "./pages/LandingPage/QatarToBarbados";
import DubaiToBhutan from "./pages/LandingPage/DubaiToBhutan";
import SaudiToBolivia from "./pages/LandingPage/SaudiToBolivia";
import QatarToAndorra from "./pages/LandingPage/QatarToAndorra";
import OmanToGermany from "./pages/LandingPage/OmanToGermany";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-us", element: <About /> },
      {
        path: "/services",
        children: [
          { path: ":name", element: <DedicatedPage /> },
          { path: "specialized-services", element: <SpecializedSetup /> },
          { path: "specialized-services/:link_url", element: <SpecializedDedicatedPage /> },
        ],
      },
      { path: "/our-network", element: <OurNetwork /> },
      { path: "/industries", element: <Industries /> },
      {
        path: "/market-updates",
        children: [
          { index: true, element: <MarketUpdates /> },
          { path: ":blogSlug", element: <MainMarket /> },
        ],
      },
      {
        path: "/gallery",
        children: [
          { index: true, element: <Gallery /> },
          { path: ":name", element: <GalleryDedicatedPage /> },
        ],
      },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/careers", element: <Careers /> },
      // Landing Pages
      { path: "/courier-and-cargo-services-from-qatar-to-jordan", element: <LandingPage /> },
      { path: "/courier-and-cargo-services-saudi-to-turkey", element: <Turkey /> },
      { path: "/door-to-door-courier-and-cargo-services-oman-to-israel", element: <Israel /> },
      {
        path: "/door-to-door-courier-and-cargo-services-dubai-to-singapore",
        element: <Singapore />,
      },
      {
        path: "/door-to-door-courier-and-cargo-services-from-qatar-to-thailand",
        element: <Thailand />,
      },
      {
        path: "/door-to-door-courier-and-cargo-services-saudi-indonesia",
        element: <Indonesia />,
      },
      { path: "/door-to-door-courier-cargo-services-qatar-malaysia", element: <Malaysia /> },
      { path: "/door-to-door-courier-cargo-services-oman-brazil", element: <Brazil /> },
      {
        path: "/door-to-door-courier-and-cargo-services-from-oman-to-bahrain",
        element: <Bahrain />,
      },
      { path: "/door-to-door-courier-cargo-services-dubai-cambodia", element: <Cambodia /> },
      { path: "/door-to-door-courier-cargo-services-saudi-armenia", element: <Armenia /> },
      { path: "/door-to-door-courier-cargo-services-dubai-belgium", element: <Belgium /> },
      { path: "/door-to-door-courier-cargo-services-qatar-italy", element: <Italy /> },
      { path: "/door-to-door-courier-cargo-services-oman-kuwait", element: <Kuwait /> },
      { path: "/door-to-door-courier-cargo-services-dubai-austria", element: <Austria /> },
      { path: "/door-to-door-courier-cargo-services-saudi-kenya", element: <Kenya /> },
      { path: "/door-to-door-courier-cargo-services-qatar-australia", element: <Australia /> },
      { path: "/door-to-door-courier-cargo-services-oman-portugal", element: <Portugal /> },
      { path: "/door-to-door-courier-and-cargo-services-from-dubai-to-myanmar", element: <Myanmar /> },
      { path: "/door-to-door-courier-cargo-services-saudi-france", element: <France /> },
      { path: "/door-to-door-courier-cargo-services-qatar-philippines", element: <Philippines /> },
      { path: "/door-to-door-courier-cargo-services-oman-morocco", element: <Morocco /> },
      { path: "/door-to-door-courier-cargo-services-saudi-india", element: <India /> },
      { path: "/door-to-door-courier-cargo-services-dubai-bangladesh", element: <Bangladesh /> },
      { path: "/door-to-door-courier-cargo-services-qatar-to-albania", element: <Albania /> },
      { path: "/door-to-door-courier-cargo-services-qatar-colombia", element: <Colombia /> },
      { path: "/door-to-door-courier-cargo-services-oman-to-chile", element: <Chile /> },
      { path: "/door-to-door-courier-cargo-services-dubai-algeria", element: <DubaiToAlgeria /> },
      { path: "/door-to-door-courier-cargo-services-saudi-bahamas", element: <SaudiToBahamas /> },
      { path: "/door-to-door-courier-cargo-services-qatar-barbados", element: <QatarToBarbados /> },
      { path: "/door-to-door-courier-cargo-services-oman-belarus", element: <OmanToBelarus /> },
      { path: "/door-to-door-courier-cargo-services-dubai-bhutan", element: <DubaiToBhutan /> },
      { path: "/door-to-door-courier-cargo-services-saudi-bolivia", element: <SaudiToBolivia /> },
      { path: "/door-to-door-courier-and-cargo-services-qatar-andorra", element: <QatarToAndorra /> },
      { path: "/door-to-door-courier-and-cargo-services-oman-germany", element: <OmanToGermany /> }
    ],
  },
]);

const App = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
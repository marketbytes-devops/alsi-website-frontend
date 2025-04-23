import React, { useState, useEffect, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async"; 
import Layout from "./components/Layout";
import LottieLoader from "./components/LottieLoader";
import apiClient from "./api";
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

const Sitemap = () => {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [specializedServices, setSpecializedServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    apiClient.get('service/services/').then((response) => setServices(response.data)).catch(console.error);
    apiClient.get('market/blog-banner/').then((response) => setBlogs(response.data)).catch(console.error);
    apiClient.get('service/specialized-entries/').then((response) => setSpecializedServices(response.data)).catch(console.error);
    apiClient.get('gallery/gallery-entries/').then((response) => setGalleryItems(response.data)).catch(console.error);
  }, []);

  const staticUrls = [
    { loc: 'https://www.alsiglobal.com/', priority: '1.0', changefreq: 'weekly' },
    { loc: 'https://www.alsiglobal.com/about-us', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/our-network', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/industries', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/market-updates', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://www.alsiglobal.com/gallery', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/contact-us', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/careers', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://www.alsiglobal.com/services/specialized-services', priority: '0.9', changefreq: 'monthly' },
  ];

  const dynamicUrls = [
    ...services.map((service) => ({
      loc: `https://www.alsiglobal.com/services/${service.link_url}`,
      priority: '0.9',
      changefreq: 'monthly',
    })),
    ...specializedServices.map((service) => ({
      loc: `https://www.alsiglobal.com/services/specialized-services/${service.link_url}`,
      priority: '0.9',
      changefreq: 'monthly',
    })),
    ...blogs.map((blog) => ({
      loc: `https://www.alsiglobal.com/market-updates/${blog.blog_slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    ...galleryItems.map((item) => ({
      loc: `https://www.alsiglobal.com/gallery/${item.name}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticUrls, ...dynamicUrls].map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return (
    <pre aria-label="Sitemap XML">{sitemapXml}</pre>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>ALSI Global LLC - Logistics Solutions in Oman</title>
          <meta
            name="description"
            content="ALSI Global LLC offers comprehensive logistics solutions including customs clearance, freight forwarding, and warehousing in Oman and the GCC."
          />
          <meta name="keywords" content="logistics Oman, ALSI Global, freight forwarding, customs clearance" />
          <link rel="canonical" href="https://www.alsiglobal.com/" />
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ALSI Global LLC",
              "url": "https://www.alsiglobal.com",
              "logo": "https://www.alsiglobal.com/logo.png",
              "description": "Leading logistics provider in Oman offering customs clearance, freight forwarding, and more."
            }
          `}</script>
        </Helmet>
        <Layout />
      </>
    ),
    errorElement: (
      <Suspense fallback={<LottieLoader />}>
        <Helmet>
          <title>Error - ALSI Global LLC</title>
          <meta name="description" content="An error occurred on the ALSI Global LLC website." />
          <link rel="canonical" href="https://www.alsiglobal.com/error" />
        </Helmet>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/" />
            </Helmet>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/about-us" />
            </Helmet>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/services",
        children: [
          {
            path: ":name",
            element: (
              <Suspense fallback={<LottieLoader />}>
                <Helmet>
                  <link rel="canonical" href={`https://www.alsiglobal.com/services/:name`} />
                </Helmet>
                <DedicatedPage />
              </Suspense>
            ),
          },
          {
            path: "specialized-services",
            element: (
              <Suspense fallback={<LottieLoader />}>
                <Helmet>
                  <link rel="canonical" href="https://www.alsiglobal.com/services/specialized-services" />
                </Helmet>
                <SpecializedSetup />
              </Suspense>
            ),
          },
          {
            path: "specialized-services/:link_url",
            element: (
              <Suspense fallback={<LottieLoader />}>
                <Helmet>
                  <link rel="canonical" href={`https://www.alsiglobal.com/services/specialized-services/:link_url`} />
                </Helmet>
                <SpecializedDedicatedPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/our-network",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/our-network" />
            </Helmet>
            <OurNetwork />
          </Suspense>
        ),
      },
      {
        path: "/industries",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/industries" />
            </Helmet>
            <Industries />
          </Suspense>
        ),
      },
      {
        path: "/market-updates",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/market-updates" />
            </Helmet>
            <MarketUpdates />
          </Suspense>
        ),
      },
      {
        path: "/market-updates/:blogSlug",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href={`https://www.alsiglobal.com/market-updates/:blogSlug`} />
            </Helmet>
            <MainMarket />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/gallery" />
            </Helmet>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "/gallery/:name",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href={`https://www.alsiglobal.com/gallery/:name`} />
            </Helmet>
            <GalleryDedicatedPage />
          </Suspense>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/contact-us" />
            </Helmet>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/careers",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <link rel="canonical" href="https://www.alsiglobal.com/careers" />
            </Helmet>
            <Careers />
          </Suspense>
        ),
      },
      {
        path: "/sitemap.xml",
        element: (
          <Suspense fallback={<LottieLoader />}>
            <Helmet>
              <meta name="robots" content="noindex" /> 
            </Helmet>
            <Sitemap />
          </Suspense>
        ),
      },
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
        {loading ? (
          <>
            <Helmet>
              <meta name="robots" content="noindex" /> 
            </Helmet>
            <LottieLoader />
          </>
        ) : (
          <RouterProvider router={router} />
        )}
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
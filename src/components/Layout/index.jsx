import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop";
import GTMTracker from "../../GTMTracker";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    closeSidebar();
  }, [location]);

  const isHomePage = location.pathname === "/";

  return (
    <>
    <GTMTracker />
    <ScrollToTop/>
    <div className="relative">
      <AnimatePresence>
        {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
      </AnimatePresence>

      {isHomePage ? (
        <Nav toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar toggleSidebar={toggleSidebar} />
      )}

      <motion.main
        className="min-h-auto flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Outlet />
        <Footer />
      </motion.main>
    </div>
    </>
  );
};

export default Layout;

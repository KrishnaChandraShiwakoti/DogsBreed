import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="relative md:max-w-8/12  md:mx-auto mx-2 my-1">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;

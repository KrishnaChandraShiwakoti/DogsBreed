import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="max-w-8/12 mx-auto my-1">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;

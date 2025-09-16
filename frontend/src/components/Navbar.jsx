import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="my-2 bg-blue-400 py-5 flex justify-around rounded-2xl shadow-2xl">
      <Link to="/">Home</Link>
      <Link to="/">Breed</Link>
      <Link to="/add">Add a Breed</Link>
      <Link to="/search">Search</Link>
    </div>
  );
};

export default Navbar;

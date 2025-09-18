import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="my-2 bg-blue-400 py-3 px-4 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white block md:hidden text-lg">
          DogsBreed
        </span>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={`flex-col md:flex-row md:flex justify-around mt-2 md:mt-0 ${
          open ? "flex" : "hidden md:flex"
        }`}>
        <Link
          to="/"
          className="block py-2 px-3 text-white hover:bg-blue-500 rounded md:inline">
          Home
        </Link>
        <Link
          to="/"
          className="block py-2 px-3 text-white hover:bg-blue-500 rounded md:inline">
          Breed
        </Link>
        <Link
          to="/add"
          className="block py-2 px-3 text-white hover:bg-blue-500 rounded md:inline">
          Add a Breed
        </Link>
        <Link
          to="/groups"
          className="block py-2 px-3 text-white hover:bg-blue-500 rounded md:inline">
          Groups
        </Link>
        <Link
          to="/search"
          className="block py-2 px-3 text-white hover:bg-blue-500 rounded md:inline">
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

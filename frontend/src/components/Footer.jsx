import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white mt-20">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} DogsBreed. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <a href="/" className="hover:text-blue-400 transition-colors text-sm">
            Home
          </a>
          <a
            href="/add"
            className="hover:text-blue-400 transition-colors text-sm">
            Add a breed
          </a>
          <a
            href="/search"
            className="hover:text-blue-400 transition-colors text-sm">
            Search
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

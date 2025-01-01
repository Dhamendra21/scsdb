import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidenav}
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#6556CD] text-white p-2 rounded-md"
        aria-label="Toggle Sidebar"
      >
        <i className={`ri-menu-${isOpen ? "unfold" : "fold"}-line text-2xl`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] max-w-[300px] bg-[#1F1E24] transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-[20%] lg:static `}
      >
        <div className="p-10">
          <h1 className="text-white font-bold">
            <i className="ri-tv-fill text-2xl mr-3 text-[#6556CD]"></i>
            <span className="text-2xl">SCSDB</span>
          </h1>
          <nav className="flex flex-col w-full gap-3 text-zinc-300 text-xl mt-10">
            <h1 className="text-white font-semibold text-xl mb-5">New Feeds</h1>
            <Link
              className="hover:bg-[#6556CD] w-fit  hover:text-white rounded-md duration-300 p-3"
              to={"/trending"}
            >
              <i className="ri-fire-fill mr-2"></i>Trending
            </Link>
            <Link
              to={"/popular"}
              className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3"
            >
              <i className="ri-bard-fill mr-2"></i>Popular
            </Link>
            <Link
              to={"/movie"}
              className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3"
            >
              <i className="ri-movie-2-fill mr-2"></i>Movies
            </Link>
            <Link
              to={"/tv"}
              className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3"
            >
              <i className="ri-tv-2-fill mr-2"></i>Tv Shows
            </Link>
            <Link
              to={"/person"}
              className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3"
            >
              <i className="ri-team-fill mr-2"></i>People
            </Link>
          </nav>
          <hr className="border-none h-[1px] bg-zinc-400 my-5" />
          <nav className="flex flex-col gap-3 text-zinc-300 text-xl">
            <h1 className="text-white font-semibold text-xl mb-5">
              Website Information
            </h1>
            <Link className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3">
              <i className="ri-information-fill mr-2"></i>About
            </Link>
            <Link className="hover:bg-[#6556CD] w-fit hover:text-white rounded-md duration-300 p-3">
              <i className="ri-phone-fill mr-2"></i>Contact Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidenav}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Sidenav;

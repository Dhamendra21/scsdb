import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5)), url('https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex flex-col justify-end p-5 md:p-10 text-white"
    >
      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-100">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>

      {/* Overview */}
      <p className="mt-3 text-sm md:text-base lg:text-lg w-full md:w-10/12 lg:w-8/12">
        {data.overview.slice(0, 100)}{" "}
        <Link
          to={`${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          .......more
        </Link>
      </p>

      {/* Release Info */}
      <p className="mt-5 mb-5 text-xs md:text-sm lg:text-base uppercase flex flex-wrap items-center gap-5">
        <span className="flex items-center gap-2">
          <i className="ri-megaphone-fill"></i>
          {data.release_date || "No information"}
        </span>
        <span className="flex items-center gap-2">
          <i className="ri-album-fill"></i>
          {data.media_type}
        </span>
      </p>

      {/* Trailer Button */}
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD] w-fit px-4 py-2 md:px-6 md:py-3 lg:p-4 rounded-md text-sm md:text-base lg:text-lg"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noImage from "/noImage.png";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      if (query.trim()) {
        const { data } = await axios.get(`/search/multi?query=${query}`);
        setSearches(data.results);
      } else {
        setSearches([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] flex items-center relative px-5 lg:px-10 bg-[#1F1E24]">
      {/* Search Icon */}
      <i className="text-white text-2xl lg:text-3xl ri-search-line"></i>

      {/* Search Input */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow mx-3 lg:mx-10 p-2 lg:p-3 text-zinc-300 bg-transparent border-none outline-none text-sm lg:text-base"
        value={query}
        type="text"
        placeholder="Search Anything"
      />

      {/* Clear Button */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-white text-2xl lg:text-3xl ri-close-line cursor-pointer"
        ></i>
      )}

      {/* Search Results */}
      {query.length > 0 && (
        <div className="absolute w-full lg:w-7/12 z-50 max-h-[50vh] overflow-auto shadow-lg bg-zinc-200 top-[100%] left-0 lg:left-auto mt-2 rounded-md">
          {searches.map((data, index) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={data.id}
              className="flex items-center p-3 hover:bg-zinc-300 text-zinc-600 font-semibold border-b border-zinc-100 duration-300"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded-sm mr-3 shadow-md"
                src={
                  data.backdrop_path || data.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        data.backdrop_path || data.profile_path
                      }`
                    : noImage
                }
                alt="Thumbnail"
              />
              <span className="text-sm lg:text-base">
                {data.title ||
                  data.name ||
                  data.original_name ||
                  data.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;

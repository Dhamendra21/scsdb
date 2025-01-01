import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Drpdown from "./partials/Drpdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = `SCSDB | Popular ${category}`;

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      setPopular((prev) => [...(prev || []), ...data.results]);

      if (data.results.length === 0) {
        setHasMore(false); // Stop further loading
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPopular([]); // Clear previous data
    setPage(1); // Reset page number
    setHasMore(true); // Enable infinite scroll
    GetPopular();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-fit max-sm:h-fit bg-[#1F1E24]">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center px-5 py-3 md:py-5">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] text-4xl cursor-pointer mr-2"
          ></i>
          Popular <small className="pl-2 capitalize">({category})</small>
        </h1>
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-end gap-3">
          <Topnav />
          <Drpdown
            title="Category"
            options={["tv", "movie"]}
            fnc={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Cards Section */}
      <InfiniteScroll
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
      >
        <div className="px-5">
          <Cards data={popular} title={category} />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;

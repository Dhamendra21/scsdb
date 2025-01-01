import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../../src/components/partials/Topnav";
import Drpdown from "../../src/components/partials/Drpdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

const Trending = () => {
  let navigate = useNavigate();

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "SCSDB | Trending " + category

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      settrending((prev) => [...(prev || []), ...data.results]);
      console.log(data);
      

      if (data.results.length === 0) {
        setHasMore(false); // Stop further loading
      } else {
        setpage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    settrending([]); // Clear previous data
    setpage(1); // Reset page number
    setHasMore(true); // Enable infinite scroll
    GetTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-full h-screen">
      <div className="w-full flex items-center">
        <h1 className="text-2xl max-sm:text-start max-sm:hidden px-[5%] font-semibold flex text-zinc-400">
          {" "}
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] text-4xl"
          ></i>{" "}
          Trending <small className='pl-2 capitalize'>({category})</small>
        </h1>
        <div className=" w-10/12 max-sm:w-full flex max-sm:flex-col items-center">
        <h1 className="text-2xl md:hidden lg:hidden px-[5%] font-semibold flex text-zinc-400">
          {" "}
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] text-4xl"
          ></i>{" "}
          Trending <small className='pl-2 capitalize'>({category})</small>
        </h1>
          <Topnav />
          <Drpdown
            title="Category"
            options={["tv", "movie", "all"]}
            fnc={(e) => setcategory(e.target.value)}
          />
          <div className="p-5"></div>
          <Drpdown
            title="Duration"
            options={["week", "day"]}
            fnc={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading...</h1>}
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
      >
        <Cards data={trending} title={category}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Trending;
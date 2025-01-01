import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  let { pathname } = useLocation();
  let category = pathname.includes("movie") ? "movie" : "tv";
  let YTvideos = useSelector((state) => state[category].info.videos);
  let navigate = useNavigate();
  console.log(pathname, YTvideos);

  return (
    <div className="bg-[rgba(0,0,0,0.9)] absolute top-0 left-0 z-100 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute ri-close-fill hover:text-[#6556CD] text-4xl text-white top-[5%] right-[2%]"
      ></Link>
      {YTvideos ? (
        <ReactPlayer
        controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${YTvideos.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;

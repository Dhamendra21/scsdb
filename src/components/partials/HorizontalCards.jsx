import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"


const HorizontalCards = ({ data }) => {
  return (
    
      
      <div className="w-[100%] text-white overflow-y-hidden flex h-[40vh] ">
        {data.length >0 ? data.map((d, i) => {
          return (
            <Link to={`/${d.media_type}/details/${d.id}`} key={i} className=" min-w-[17%] max-sm:w-[50vw] max-sm:flex-shrink-0 h-[35vh] bg-zinc-900  mr-5 mb-5 ">
              <img
                className="w-full object-cover h-[50%] "
                src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.poster_path
                }`: noimage }
                alt=""
              />
              <div className="p-3 h-[45%] overflow-y-auto">
                <h1 className="text-xl mt-3 font-semibold ">
                  {d.title || d.name || d.original_name || d.original_title}
                </h1>
                <p className="mt-3  leading-5">
                  {d.overview.split(" ").slice(0, 10).join(" ")}{" "}
                  <Link className="text-blue-400">.......more</Link>
                </p>
              </div>
            </Link>
          );
        }) : <h1 className="text-3xl font-black text-white text-center  mt-5">Nothing To Show</h1> } 
    </div>
  );
};

export default HorizontalCards;

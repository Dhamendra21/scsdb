import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/noimage.png"
const Cards = ({ data, title }) => {
  console.log(title);

  return (
    <div className="  flex max-sm:justify-center w-ful h-full p-[5%] bg-[#1F1E24]  flex-wrap overflow-y-auto">
      {data.map((c, i) => {
        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="relative w-[25vh] max-sm:w-[40%]   shadow-[8px_17x_38px_2px_rgba(0,0,0,0.5)] mr-[5%] mb-5%"
            key={i}
          >
            <img
              className=" h-[40vh] max-sm:h-[20vh] object-cover"
              src={ c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/w500/${
                c.poster_path || c.backdrop_path || c.profile_path
              }` : 
               noimage
            }
              alt={c.title}
            />
            <h1 className="text-zinc-200 mt-3 text-xl font-bold">
              {c.title || c.name || c.original_name || c.original_title}
            </h1>
            {c.vote_average && (
              <div className=" absolute flex justify-center items-center font-semibold   bg-[#f4e862b0] rounded-md py-1 w-[7vh] top-0 ">
                {(c.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadperson, removePerson } from "../actions/PersonAction";
import Loading from "../../components/Loading";
import HorizontalCard from "../../components/partials/HorizontalCards";
import Drpdown from "../../components/partials/Drpdown";

const PersonDetails = () => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => dispatch(removePerson());
  }, [id]);

  return info ? (
    <div className="px-4 md:px-10 w-full h-fit flex flex-col bg-[#1F1E24]">
      {/* part1 navigation */}
      <nav className="text-zinc-200 flex gap-4 md:gap-10 items-center text-xl mt-5">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] text-4xl"
        ></Link>
      </nav>

      <div className="flex flex-col md:flex-row md:gap-10 mt-10">
        {/* left poster and details */}
        <div className="w-full md:w-[20%] flex-shrink-0 mb-10 md:mb-0">
          <img
            className="w-full h-[35vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/w500/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt={info.detail.name}
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* personal profile */}
          <div className="text-2xl flex gap-4 md:gap-7 text-white">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalId.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl font-semibold text-zinc-400 my-3">
            Personal Info
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Known for</h1>
          <h1 className="font-semibold text-zinc-400">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Gender</h1>
          <h1 className="font-semibold text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Birthday</h1>
          <h1 className="font-semibold text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">
            Place of Birth
          </h1>
          <h1 className="font-semibold text-zinc-400">
            {info.detail.place_of_birth}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">
            Also Known As
          </h1>
          <h1 className="font-semibold text-zinc-400">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* right details and information */}
        <div className="w-full md:w-[80%] my-10">
          <h1 className="text-4xl md:text-6xl text-zinc-400 my-3 font-black">
            {info.detail.name}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Biography</h1>
          <p className="mt-3 font-semibold text-zinc-400">{info.detail.biography}</p>

          <h1 className="text-lg font-semibold text-zinc-400 my-2">
            Movies and Shows
          </h1>
          <HorizontalCard data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between mt-5">
            <h1 className="text-lg font-semibold text-zinc-400">Acting</h1>
            <Drpdown
              title="Category"
              options={["tv", "movie"]}
              fnc={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="w-full mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 h-[50vh]">
            {info[category + "Credits"]?.cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white hover:bg-[#19191d] duration-300 p-3 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;

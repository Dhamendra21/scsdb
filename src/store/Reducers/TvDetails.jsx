import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../../components/Loading";
import HorizontalCard from "../../components/partials/HorizontalCards";
import { asyncLoadTv, removeTv } from "../actions/TvActions";

const TvDetails = () => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => dispatch(removeTv());
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5)), url('https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="w-full h-fit px-5 md:px-16 lg:px-24 relative"
    >
      {/* Navigation */}
      <nav className="h-[10vh] text-zinc-200 flex gap-6 items-center text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] text-4xl cursor-pointer"
        />
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
        >
          IMDb
        </a>
      </nav>

      {/* Poster and Details */}
      <div className="w-full flex flex-col md:flex-row">
        <img
          className="w-full md:w-1/2 h-[50vh] object-cover shadow-lg"
          src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.title}
        />

        <div className="content ml-0 md:ml-10 text-white mt-5 md:mt-0">
          <h1 className="font-black text-3xl md:text-5xl text-zinc-100">
            {info.detail.title || info.detail.name || info.detail.original_name || info.detail.original_title}
            <small className="text-xl font-bold text-zinc-300">
              {" "}
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex gap-3 text-sm items-center text-zinc-100 mt-5 mb-5 flex-wrap">
            {info.detail.vote_average && (
              <span className="flex justify-center items-center font-semibold bg-[#f3992cd5] rounded-full h-[7vh] w-[7vh]">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
            )}
            <h1 className="w-[60px] font-semibold text-2xl">User score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime} Min</h1>
          </div>

          <h1 className="text-zinc-200 text-xl font-bold italic">{info.detail.tagline}</h1>
          <h1 className="text-2xl mt-4">Overview</h1>
          <p className="text-sm mb-3">{info.detail.overview}</p>

          <h1>Movie Translated</h1>
          <p className="text-sm mb-7">{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="mt-5 px-5 py-3 rounded-lg bg-[#6556CD] inline-flex items-center"
          >
            <i className="ri-play-fill mr-2"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Available on Platforms */}
      <div className="mt-5">
        {info.watchProviders?.flatrate && (
          <div className="flex gap-5">
            <h1 className="text-white font-semibold text-sm">Available On Platforms</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchProviders?.rent && (
          <div className="flex gap-5 mt-2 items-center">
            <h1 className="text-white font-semibold text-sm">Available On Rent</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchProviders?.buy && (
          <div className="flex gap-2 mt-5">
            <h1 className="text-white font-semibold text-sm">Available to Buy</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Seasons */}
      <div className="mt-16 border-t-2 border-t-zinc-400 pt-5">
        <h1 className="text-3xl font-bold text-white mb-5">Seasons</h1>
        <div className="w-full overflow-x-scroll mb-5 p-5 flex gap-5">
          {info.detail.seasons ? info.detail.seasons.map((s, i) => (
            <div className="flex-shrink-0 w-[200px] sm:w-[250px]">
              <img
                className="h-[30vh] object-cover shadow-2xl"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt={s.name}
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">{s.name}</h1>
            </div>
          )) : <div className="text-xl text-white">Nothing to show</div>}
        </div>
      </div>

      {/* Recommendations and Similar */}
      <div className="mt-16 border-t-2 border-t-zinc-400 pt-5">
        <h1 className="text-3xl font-bold text-white mb-5">Recommendations and Similar</h1>
        <HorizontalCard
          data={info.recommendations.length > 0 ? info.recommendations : info.similar}
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;

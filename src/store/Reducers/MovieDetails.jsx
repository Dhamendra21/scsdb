import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../actions/MovieAction";
import Loading from "../../components/Loading";
import HorizontalCard from "../../components/partials/HorizontalCards";

const MovieDetails = () => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { info } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => dispatch(removeMovie());
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5)), url('https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="w-full h-fit px-4 sm:px-8 md:px-16 lg:px-[10%] relative"
    >
      {/* part1 navigation */}
      <nav className="h-[10vh] text-zinc-200 flex gap-5 sm:gap-8 items-center text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] text-4xl"
        ></Link>

        <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
          <i className="ri-earth-fill"></i>
        </a>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a target="_blank" href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}>
          imdb
        </a>
      </nav>

      {/* part 2 poster and details */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          <img
            className="h-[50vh] w-full md:w-[40%] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path}`}
            alt={info.detail.title}
          />
          
          <div className="content md:ml-10 text-white mt-5 md:mt-0">
            <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-zinc-100">
              <span>{info.detail.title || info.detail.name || info.detail.original_name || info.detail.original_title}</span>
              <small className="text-lg sm:text-xl font-bold text-zinc-300">
                ({info.detail.release_date.split("-")[0]})
              </small>
            </h1>

            <div className="flex gap-3 text-sm items-center text-zinc-100 mt-5 mb-5">
              {info.detail.vote_average && (
                <span className="flex justify-center items-center font-semibold bg-[#f3992cd5] rounded-full h-[7vh] w-[7vh]">
                  {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                </span>
              )}
              <h1 className="w-[60px] leading-none font-semibold text-2xl">User score</h1>
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
              <h1>{info.detail.runtime} Min </h1>
            </div>

            <h1 className="text-zinc-200 text-xl font-bold italic">{info.detail.tagline}</h1>
            <h1 className="text-2xl">Overview</h1>
            <p className="text-sm mb-3">{info.detail.overview}</p>

            <h1>Movie Translated</h1>
            <p className="text-sm mb-7">{info.translations.join(", ")}</p>

            <Link to={`${pathname}/trailer`} className="mt-5 px-5 py-3 rounded-lg bg-[#6556CD]">
              <i className="ri-play-fill mr-2"></i> Play Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* available on platforms */}
      <div className="flex flex-col mt-5 w-full sm:w-10/12">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-5">
            <h1 className="text-white font-semibold text-sm">Available On Platforms</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img key={i} title={w.provider_name} className="w-[5vh] rounded-md" src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-5 mt-2 items-center">
            <h1 className="text-white font-semibold text-sm">Available On Rent</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img key={i} title={w.provider_name} className="w-[5vh] rounded-md" src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-2 mt-5">
            <h1 className="text-white font-semibold text-sm">Available to Buy</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img key={i} title={w.provider_name} className="w-[5vh] rounded-md" src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`} alt="" />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations and similar */}
      <div className="mt-16 border-t-2 border-t-zinc-400">
        <h1 className="text-3xl font-bold text-white mb-5">Recommendations and Similar</h1>
        <HorizontalCard data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;

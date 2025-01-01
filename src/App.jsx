import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trailer from "./components/partials/Trailer";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movie";
import TvShows from "./components/TvShows";
import People from "./components/People";
import MovieDetails from "./store/Reducers/MovieDetails";
import TvDetails from "./store/Reducers/TvDetails";
import NotFound from "./components/NotFound";
import PersonDetails from "./store/Reducers/PersonDetails";

const App = () => {
  document.title = "SCSDB | Home page ";
  return (
    <div className="w-full h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} > 
          <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
        </Route>

        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} > 
          <Route path="/tv/details/:id/trailer" element={<Trailer/>} />
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;

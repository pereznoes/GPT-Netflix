import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import { GrPlayFill } from "react-icons/gr";
import { YT_IFRAME_URL } from "../constants/yt";
import { NowPlayingLoaderData } from "../loaders/nowPlayingLoader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store/appStore";
import Categories from "./Categories";
import { TMDB_LOGO_BASE_URL } from "../constants/tmdb_urls";

const Browse = () => {
  const [index, setIndex] = useState(0);
  const data: NowPlayingLoaderData = useLoaderData() as typeof data;
  const trailerKey = useSelector(
    (state: RootState) => state.movies.trailerKeys.nowPlaying
  );
  const movies = useSelector(
    (state: RootState) => state.movies.categories.nowPlayingMovies
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data[0].length);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative bg-slate-50 min-h-screen w-full">
        <div className="absolute flex items-center justify-between w-full px-[5%] h-full lg:pl-5">
          <div className="p-10 flex flex-col gap-y-6 w-1/4">
            <div>
              <img
                src={`${TMDB_LOGO_BASE_URL}${movies?.[index]?.logoPath}`}
                alt={movies?.[index]?.title}
                className="w-[200px] aspect-auto"
              />
            </div>
            <div className="text-4xl font-bold antialiased [text-shadow:_0_0_6px_rgb(0_0_0_/_40%)] w-max">
              {movies?.[index]?.title}
            </div>
            <div className="antialiased text-slate-10 text-wrap min-h-min [text-shadow:_0_0_6px_rgb(0_0_0_/_40%)] ">
              {movies?.[index]?.overview}
            </div>
            <div className="flex gap-3">
              <button className="text-lg py-2 px-10 bg-slate-100 hover:text-white hover:bg-slate-100/50 transition-all duration-200 text-black rounded font-medium flex items-center gap-2 cursor-pointer">
                <span>
                  <GrPlayFill />
                </span>{" "}
                Play
              </button>
              <button className="text-lg py-2 px-9 bg-gray-700/50 text-white rounded font-medium cursor-pointer hover:bg-gray-700 transition-all duration-200">
                More info
              </button>
            </div>
          </div>
        </div>
        <div>
          <iframe
            src={YT_IFRAME_URL(trailerKey[index])}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full aspect-video"
          ></iframe>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Header />
        </div>
      </div>
      <div className="text-white">
        <Categories />
      </div>
    </div>
  );
};

export default Browse;

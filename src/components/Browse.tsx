import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../store/slices/moviesSlice";
import { NowPlayingLoaderData } from "../loaders/nowPlayingLoader";
import { GrPlayFill } from "react-icons/gr";

const Browse = () => {
  const data: NowPlayingLoaderData = useLoaderData();
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(addNowPlayingMovies(data?.results));
  }, [data]);

  return (
    <div className="relative bg-slate-50 min-h-screen w-full">
      <div className="absolute flex items-center justify-between w-full px-[5%] h-full bg-gradient-to-r from-black to-transparent">
        <div className="p-10 flex flex-col gap-y-6 w-1/4">
          <div className="text-6xl font-bold antialiased shadow-sm">
            Elemental
          </div>
          <div className="antialiased text-slate-10 text-wrap min-h-min">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            adipisci commodi sunt, ullam libero sapiente! Labore maiores, eius
            explicabo, eum id molestias expedita perferendis culpa velit cum
            delectus blanditiis repellat impedit, neque praesentium quod totam
            voluptas omnis officiis magni molestiae.
          </div>
          <div className="flex gap-3 z-50">
            <button className="text-lg py-2 px-10 bg-slate-100 hover:bg-slate-100/50 hover:text-white transition-all duration-100 text-black rounded font-medium flex items-center gap-2 cursor-pointer">
              <span>
                <GrPlayFill />
              </span>{" "}
              Play
            </button>
            <button className="text-lg py-2 px-9 bg-gray-700/40 text-white rounded font-medium cursor-pointer">
              More info
            </button>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.youtube.com/embed/p7-3vJXPcyw?&autoplay=1&mute=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full aspect-video"
      ></iframe>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Header />
      </div>
    </div>
  );
};

export default Browse;

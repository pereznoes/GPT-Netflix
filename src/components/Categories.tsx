import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import { RootState } from "../store/appStore";

const Categories = () => {
  const nowPlayingMovies = useSelector(
    (state: RootState) => state.movies.categories.nowPlayingMovies
  );
  const popularMovies = useSelector(
    (state: RootState) => state.movies.categories.popularMovies
  );
  const topRatedMovies = useSelector(
    (state: RootState) => state.movies.categories.topRatedMovies
  );
  const trendingMovies = useSelector(
    (state: RootState) => state.movies.categories.trendingMovies
  );

  console.log(nowPlayingMovies);

  return (
    <div className="bg-black min-h-max relative">
      <div className="flex flex-col gap-7 sm:gap-14 pb-20 -mt-20">
        <MoviesList title={"Now Playing"} movies={nowPlayingMovies} />
        <MoviesList title={"Popular"} movies={popularMovies} />
        <MoviesList title={"Top Rated"} movies={topRatedMovies} />
        <MoviesList title={"Trending"} movies={trendingMovies} />
      </div>
    </div>
  );
};

export default Categories;

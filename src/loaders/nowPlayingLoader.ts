import { TMDB_API_OPTIONS } from "../constants/tmdb_api_options";
import { appStore } from "../store/appStore";
import {
  addNowPlayingMovies,
  addNowPlayingTrailerKeys,
  addPopularMovies,
  addTopRatedMovises,
  addTrendingMovies,
} from "../store/slices/moviesSlice";

export const nowPlayingLoader = async () => {
  const fetchNowPlaying = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      TMDB_API_OPTIONS
    );
    return res.json();
  };

  const fetchPopular = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      TMDB_API_OPTIONS
    );
    return res.json();
  };

  const fetchTopRated = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      TMDB_API_OPTIONS
    );
    return res.json();
  };

  const fetchTrending = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      TMDB_API_OPTIONS
    );
    return res.json();
  };

  const data = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchTopRated(),
    fetchTrending(),
  ]);

  const categories = data.map((d) => d.results);

  const nowPlayingIds = categories[0].map((movie: { id: string }) => movie.id);
  const popularIds = categories[1].map((movie: { id: string }) => movie.id);
  const topRatedIds = categories[2].map((movie: { id: string }) => movie.id);
  const trendingIds = categories[3].map((movie: { id: string }) => movie.id);

  // fetch now playing logos & posters
  const getTMDBImagePaths = async (id: string) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      TMDB_API_OPTIONS
    );
    const data = await res.json();

    const logoPath =
      data?.logos?.find(({ file_path }: { file_path: string }) =>
        file_path.includes(".svg")
      )?.file_path ??
      data?.logos?.find(
        ({ iso_639_1 }: { iso_639_1: string }) => iso_639_1 === "en"
      )?.file_path;

    const posterPath = data?.posters?.find(
      ({ iso_639_1 }: { iso_639_1: string }) => iso_639_1 === "en"
    )?.file_path;

    return { logoPath, posterPath };
  };

  let nowPlayingImages = nowPlayingIds.map((id: string) =>
    getTMDBImagePaths(id)
  );
  let popularImages = popularIds.map((id: string) => getTMDBImagePaths(id));
  let topRatedImages = topRatedIds.map((id: string) => getTMDBImagePaths(id));
  let trendingImages = trendingIds.map((id: string) => getTMDBImagePaths(id));

  nowPlayingImages = await Promise.all(nowPlayingImages);
  popularImages = await Promise.all(popularImages);
  topRatedImages = await Promise.all(topRatedImages);
  trendingImages = await Promise.all(trendingImages);

  // update now playing movies
  const updatedNowPlayingMovies = categories[0].map(
    (movie: NowPlayingLoaderData, _idx: string | number) => ({
      ...movie,
      ...nowPlayingImages[_idx],
    })
  );

  const updatedPopularMovies = categories[1].map(
    (movie: NowPlayingLoaderData, _idx: string | number) => ({
      ...movie,
      ...popularImages[_idx],
    })
  );

  const updatedTopRatedMovies = categories[2].map(
    (movie: NowPlayingLoaderData, _idx: string | number) => ({
      ...movie,
      ...topRatedImages[_idx],
    })
  );

  const updatedTrendingMovies = categories[3].map(
    (movie: NowPlayingLoaderData, _idx: string | number) => ({
      ...movie,
      ...trendingImages[_idx],
    })
  );

  appStore.dispatch(addNowPlayingMovies(updatedNowPlayingMovies));
  appStore.dispatch(addPopularMovies(updatedPopularMovies));
  appStore.dispatch(addTopRatedMovises(updatedTopRatedMovies));
  appStore.dispatch(addTrendingMovies(updatedTrendingMovies));

  const fetchNowPlayingTrailer = async (id: string) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      TMDB_API_OPTIONS
    );
    const videos = await res.json();

    return videos.results.filter(
      ({ name }: { name: string }) =>
        name.includes("Official Trailer") || name.includes("Official Teaser")
    );
  };

  let nowPlayingTrailerKeys = nowPlayingIds.map((id: string) =>
    fetchNowPlayingTrailer(id)
  );

  nowPlayingTrailerKeys = await Promise.all(nowPlayingTrailerKeys);

  nowPlayingTrailerKeys = nowPlayingTrailerKeys.map(
    (trailer: { key: string }[]) => trailer[0]?.key
  );

  appStore.dispatch(addNowPlayingTrailerKeys(nowPlayingTrailerKeys));

  return categories;
};

export type NowPlayingLoaderData = [
  {
    id: string;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
  }[],
  {
    id: string;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
  }[],
  {
    id: string;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
  }[],
  {
    id: string;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
  }
][];

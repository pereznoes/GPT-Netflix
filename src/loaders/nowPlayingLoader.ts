import { TMDB_API_OPTIONS } from "../constants/tmdb_api_options";

export const nowPlayingLoader = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    TMDB_API_OPTIONS
  );

  const data = await res.json();

  console.log(data);

  return data;
};

export type NowPlayingLoaderData = Awaited<ReturnType<typeof nowPlayingLoader>>;

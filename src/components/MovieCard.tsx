import { TMDB_POSTER_BASE_URL } from "../constants/tmdb_urls";

const MovieCard = ({ posterPath }: { posterPath: string }) => {
  return (
    <div className="rounded w-[200px] h-[250px] bg-black">
      <div className="w-full h-full overflow-hidden rounded">
        <img
          src={`${TMDB_POSTER_BASE_URL}${posterPath}`}
          alt={"poster"}
          className="max-w-fit w-[200px] rounded object-contain"
        />
      </div>
    </div>
  );
};

export default MovieCard;

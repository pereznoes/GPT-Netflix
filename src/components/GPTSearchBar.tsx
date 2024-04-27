import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { openai } from "../utils/openai";
import { TMDB_API_OPTIONS } from "../constants/tmdb_api_options";

const GPTSearchBar = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);

  const searchMovieTMDB = async (movie: string) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      TMDB_API_OPTIONS
    );

    const movieData = await data.json();

    return movieData?.results;
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const searchQuery = searchBarRef.current?.value;

    const suggestions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are a helpful movie recommendation system. You will be given a search query and you will return a comma separated list of the top five movie names based on the query. The query is: ${searchQuery}`,
        },
      ],
    });

    const movieNames = suggestions?.choices[0]?.message?.content?.split(",");

    const data = movieNames?.map((movieName) => searchMovieTMDB(movieName));

    const results = await Promise.all(data!);

    console.log(results);
  };

  return (
    <form className="w-[37%]">
      <label
        htmlFor="search"
        className="flex items-center justify-between px-5 py-3 bg-black/70 rounded-[3rem] w-full"
      >
        <div className="pl-2 w-full">
          <input
            ref={searchBarRef}
            type="text"
            name="search"
            id="search"
            placeholder="What would you like to watch today?"
            className="border-none outline-none bg-transparent text-white placeholder:text-gray-500 text-xl w-full pr-5 tracking-normal"
          />
        </div>
        <div className="flex items-center justify-center p-3 rounded-full bg-red-600">
          <button onClick={handleClick}>
            <BiSearch className="text-red-200" />
          </button>
        </div>
      </label>
    </form>
  );
};

export default GPTSearchBar;

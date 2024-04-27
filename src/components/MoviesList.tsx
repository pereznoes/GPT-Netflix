import { useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({
  title,
  movies,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(movies);

  useEffect(() => {
    let startX: number;
    let scrollLeft: number;
    let isDown: boolean;

    const container = containerRef.current as HTMLDivElement;

    container.addEventListener("mousedown", (e) => mouseIsDown(e));
    container.addEventListener("mouseup", () => mouseUp());
    container.addEventListener("mouseleave", () => mouseLeave());
    container.addEventListener("mousemove", (e) => mouseMove(e));

    function mouseIsDown(e: { pageY: number; pageX: number }) {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    }

    function mouseUp() {
      isDown = false;
    }
    function mouseLeave() {
      isDown = false;
    }
    function mouseMove(e: {
      preventDefault: () => void;
      pageY: number;
      pageX: number;
    }) {
      if (isDown) {
        e.preventDefault();

        //Move Horizontally
        const x = e.pageX - container.offsetLeft;
        const walkX = x - startX;
        (containerRef.current as HTMLDivElement).scrollLeft =
          scrollLeft - walkX;
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="pl-7 sm:pl-10">
        <h1 className="text-lg font-semibold sm:text-2xl sm:font-bold antialiased">
          {title}
        </h1>
      </div>
      <div
        className="flex overflow-x-scroll gap-7 container-snap pl-10"
        ref={containerRef}
      >
        {movies?.map(({ posterPath }: { posterPath: string }) => (
          <MovieCard posterPath={posterPath} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;

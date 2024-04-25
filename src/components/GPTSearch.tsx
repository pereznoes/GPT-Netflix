import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <div
      style={{
        "--image-url":
          "url(/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
      }}
      className="h-screen bg-[image:var(--image-url)] object-cover backdrop-brightness-1 flex justify-center pt-40"
    >
      <GPTSearchBar />
    </div>
  );
};

export default GPTSearch;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { nowPlayingLoader } from "../loaders/nowPlayingLoader";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      loader: nowPlayingLoader,
      element: <Browse />,
    },
  ]);

  return (
    <div className="h-[100%] min-h-screen text-white bg-black">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

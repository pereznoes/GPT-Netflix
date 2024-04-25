import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { removeUser, setUser } from "../store/slices/userSlice";
import { toggleGPTSearchView } from "../store/slices/gptSlice";
import { IoChevronBack } from "react-icons/io5";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGPTSearchView = useSelector(
    (state: RootState) => state.gpt.showGPTSearchView
  );

  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        console.log(uid, email, displayName, photoURL);

        dispatch(setUser({ uid, email, displayName, photoURL }));

        navigate("/browse");
      } else {
        dispatch(removeUser());

        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex w-[100%] fixed z-[100]">
      <div
        className={`${
          user
            ? "w-[100%] flex items-center justify-between px-16 bg-gradient-to-b from-black to-transparent"
            : "w-header-w-1 mx-auto my-0"
        }`}
      >
        <div className="pt-2">
          <img
            src="/Netflix_Logo_PMS.png"
            alt="logo"
            className={user ? "w-[140px]" : "w-[200px]"}
          />
        </div>
        {user && (
          <div className="flex items-center gap-6 pt-2">
            <div className="">
              <button
                className="bg-slate-400/20 rounded-md px-4 py-2 border-none hover:scale-95 transition-transform duration-100 ease-linear"
                onClick={() => dispatch(toggleGPTSearchView())}
              >
                {!showGPTSearchView ? (
                  <span className="antialiased bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text [text-shadow:_0px_0px_12px_rgba(0,0,0,0.5)]">
                    ✨AI Search
                  </span>
                ) : (
                  <span className="antialiased flex items-center px-7 font-semibold text-2xl text-slate-100 group">
                    <IoChevronBack className="group-hover:-translate-x-1 transition-all duration-100 ease-linear" />
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-md"
                />
              </div>
              <div>
                <button
                  onClick={async () => {
                    await signOut(auth);

                    navigate("/login");
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

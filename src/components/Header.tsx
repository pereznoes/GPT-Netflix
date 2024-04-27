import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../store/slices/userSlice";
import { toggleGPTSearchView } from "../store/slices/gptSlice";
import { IoChevronBack } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGPTSearchView = useSelector(
    (state: RootState) => state.gpt.showGPTSearchView
  );
  const [toggleDropdown, setToggleDropdown] = useState(false);

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
            ? "w-[100%] flex items-center justify-between px-2 sm:px-16 bg-gradient-to-b from-black to-transparent"
            : "w-header-w-1 mx-auto my-0"
        }`}
      >
        <div className="pt-2">
          <img
            src="/Netflix_Logo_PMS.png"
            alt="logo"
            className={`${user ? "sm:w-[140px] w-[110px]" : "w-[200px]"}`}
          />
        </div>
        {user && (
          <div className="flex items-center gap-6 pt-2">
            <div className="">
              <button
                className="bg-slate-400/20 rounded-md px-1 sm:px-4 sm:py-2 border-none hover:scale-95 transition-transform duration-100 ease-linear"
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
                  className="w-8 h-8 sm:w-10 sm:h-10 sm:rounded-md rounded-full"
                />
              </div>
              <div>
                {/* <button
                  className="hidden"
                >
                  Sign out
                </button> */}
                <div className="relative">
                  <div>
                    <button>
                      <BiChevronDown
                        className={`w-5 h-5 text-slate-100 ${
                          toggleDropdown ? "rotate-[-180deg]" : ""
                        } transition-all duration-200 ease-in-out`}
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                      />
                    </button>
                  </div>
                  {toggleDropdown && (
                    <div
                      className="absolute top-10 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-500"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          Account settings
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-1"
                        >
                          Support
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          License
                        </a>
                        <button
                          type="submit"
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                          onClick={async () => {
                            await signOut(auth);

                            navigate("/login");
                          }}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

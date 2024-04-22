import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { removeUser, setUser } from "../store/slices/userSlice";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <header className="flex w-[100%] fixed">
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
          <div className="flex items-center gap-2 pt-2">
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
        )}
      </div>
    </header>
  );
};

export default Header;

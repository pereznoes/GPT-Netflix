import { useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <header className="flex w-[100%]">
        <div className="w-header-w-1 mx-auto my-0">
          <div className="pt-2">
            <img src="/Netflix_Logo_PMS.png" alt="logo" className="w-30" />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="flex w-[100%]">
      <div className="w-[100%] flex items-center justify-between px-16">
        <div className="pt-2">
          <img
            src="/Netflix_Logo_PMS.png"
            alt="logo"
            width={150}
            height={150}
          />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <img
              src={user.photoURL}
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
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen w-[100%] relative">
      <div className="h-[100%] w-[100%] overflow-hidden">
        <img
          src="/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover brightness-50 scale-110 translate-x-10 translate-y-19"
        />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 min-h-fit">
        <Header />
        <div className="flex w-[100%] justify-center items-center p-4">
          <div className="min-h-[707px] px-[68px] py-[48px] bg-[#000000b3] rounded-[4px] flex flex-col m-0 w-[25%] sm:w-[100%] md:w-[100%] max-w-[450px]">
            <header className="text-left">
              <h1 className="m-0 mb-7 p-0 text-white text-3xl font-bold">
                Sign&nbsp;{isSignIn ? "In" : "Up"}
              </h1>
            </header>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border border-gray-500 p-3 rounded-md outline-none hover:border-gray-200 focus:border-gray-200"
              />
              {!isSignIn && (
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/30 border border-gray-500 p-3 rounded-md outline-none hover:border-gray-200 focus:border-gray-200"
                />
              )}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border border-gray-500 p-3 rounded-md outline-none hover:border-gray-200 focus:border-gray-200"
              />
              {!isSignIn && (
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-black/30 border border-gray-500 p-3 rounded-md outline-none hover:border-gray-200 focus:border-gray-200"
                />
              )}
              <button className="bg-red-700 rounded p-2 font-semibold hover:bg-red-600">
                Sign {!isSignIn ? "Up" : "In"}
              </button>
              {isSignIn && (
                <>
                  <div className="flex justify-center">
                    <span className="text-gray-400">OR</span>
                  </div>
                  <button className="bg-gray-500/40 rounded p-2 font-semibold hover:bg-gray-500/50">
                    Use a sign-in code
                  </button>
                  <div className="flex justify-center">Forgot password?</div>
                </>
              )}
            </form>
            <div className="flex flex-col gap-5 mt-6">
              {isSignIn && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="
                  relative peer shrink-0
                  appearance-none w-5 h-5 border border-slate-500 rounded-sm bg-transparent
                  checked:bg-gray-50/90 checked:border-0 focus:ring-0 cursor-pointer transition-all duration-400 ease-in-out delay-0 hover:border-slate-100"
                  />
                  <label htmlFor="remember" className="cursor-pointer">
                    Remember me
                  </label>
                  <svg
                    className="
                  absolute 
                  w-5 h-5
                  hidden peer-checked:block pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
              <div className="flex gap-1">
                <span className="text-zinc-300">
                  {isSignIn ? "New to Netflix?" : "Already have an account?"}
                </span>
                <Link
                  to=""
                  className="hover:underline font-semibold"
                  onClick={handleToggleSignIn}
                >
                  Sign {isSignIn ? "up" : "in"} now
                </Link>
              </div>
              <div className="text-[13px]/tight text-zinc-400">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                <Link to="/terms" className="text-blue-600 underline">
                  Learn more.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

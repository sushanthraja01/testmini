import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo.jsx";
import { UserNav } from "@/components/user-nav.jsx";

export default function Navbar({ fsl,fsr }) {
  
  const nav = useNavigate();
  const l = localStorage.getItem("token")

  return (
    <header className="pt-10 sticky top-0 flex h-16 items-center bg-gray-9 backdrop-blur-sm px-4 md:px-6 z-50">

      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">

        <Link
          to="/dashboard"
          className="pl-10 flex items-center gap-2 text-lg font-semibold md:text-base text-white"
        >
          <Logo className="h-9 w-9 text-green-400" />
          <span className="font-headline">FarmFlow</span>
        </Link>

        {l ? (

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

            <div className="ml-auto flex-1 sm:flex-initial"></div>

            <UserNav />

          </div>

        ) : (

          <div className="pr-10 flex w-full items-center gap-4 md:ml-auto">

            <div className="ml-auto flex gap-4">

              <button
                onClick={()=>nav('/login')}
                className="cursor-pointer px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition"
              >
                Login
              </button>

              <button
                onClick={()=>nav('/register')}
                className="cursor-pointer px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition"
              >
                Register
              </button>

            </div>

          </div>

        )}

      </nav>

    </header>
  );
}
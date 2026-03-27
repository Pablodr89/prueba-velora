import { NavLink } from "react-router-dom";
import { AppRoutes } from "../views/AppRoutes";
import images from "../images/index";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 h-20 bg-on-primary-container/90 backdrop-blur-md dark:bg-slate-950/90 docked full-width z-50 shadow-xl shadow-indigo-900/20 dark:shadow-none">
      <div className="flex justify-between items-center gap-8 max-[2000px]:max-w-7xl min-[2000px]:max-w-400 mx-auto w-full">
        <div className="flex items-center gap-12">
          <NavLink to={AppRoutes.Home}>
            <img src={images.pokeball} alt="pokeball" className="h-10 w-auto" />
          </NavLink>

          <div className="flex gap-8 items-center">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-white border-b-2 border-indigo-300" : "text-indigo-200/70 hover:text-white"} transition-colors font-inter text-xs uppercase tracking-widest pb-1`
              }
              to={AppRoutes.Home}
            >
              Pokedex
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-white border-b-2 border-indigo-300" : "text-indigo-200/70 hover:text-white"} transition-colors font-inter text-xs uppercase tracking-widest pb-1`
              }
              to={AppRoutes.Teams}
            >
              Equipos
            </NavLink>
          </div>
        </div>

        {location.pathname === AppRoutes.Home && (
          <SearchBar customClasses="hidden lg:inline-block" />
        )}
      </div>
    </nav>
  );
}

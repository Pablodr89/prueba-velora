import { NavLink } from "react-router-dom";
import { AppRoutes } from "../views/AppRoutes";
import images from "../images/index";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 h-20 bg-on-primary-container/90 backdrop-blur-md dark:bg-slate-950/90 docked full-width z-50 shadow-xl shadow-indigo-900/20 dark:shadow-none">
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

      <SearchBar customClasses="hidden lg:inline-block" />
    </nav>
  );
}

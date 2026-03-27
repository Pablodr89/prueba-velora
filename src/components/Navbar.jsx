import { NavLink } from "react-router-dom";
import { AppRoutes } from "../views/AppRoutes";
import images from "../images/index";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-blue-950 w-full">
      <div className="flex justify-start">
        <NavLink to={AppRoutes.Home}>
          <img src={images.pokeball} alt="pokeball" className="h-10 w-auto" />
        </NavLink>
      </div>

      <div className="flex justify-center gap-12 md:gap-28 text-white text-lg font-medium">
        <NavLink to={AppRoutes.Home}>Home</NavLink>

        <NavLink to={AppRoutes.Teams}>Equipos</NavLink>
      </div>

      <div></div>
    </div>
  );
}

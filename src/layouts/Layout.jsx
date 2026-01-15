import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";

export default function Layout() {
  const { showModalPokemonAdded } = useContext(ModalsContext);
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center w-full h-full px-20 pt-10 relative">
        <Outlet />

        {showModalPokemonAdded && (
          <div className="w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Pokémon añadido al equipo!</p>
          </div>
        )}
      </main>
    </>
  );
}

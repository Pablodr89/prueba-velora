import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";
import ModalCombatResult from "../components/Modals/ModalCombatResult";

export default function Layout() {
  const {
    showModalPokemonAdded,
    showModalSaveTeam,
    showModalSelectedTeam,
    showModalCombatResult,
  } = useContext(ModalsContext);
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center w-full h-full px-5 lg:px-0 pt-10 relative max-[2000px]:max-w-7xl min-[2000px]:max-w-400 mx-auto">
        <Outlet />

        {showModalPokemonAdded && (
          <div className="animate-in w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Pokémon añadido al borrador!</p>
          </div>
        )}
        {showModalSaveTeam && (
          <div className="animate-in w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Equipo guardado con éxito!</p>
          </div>
        )}
        {showModalSelectedTeam && (
          <div className="animate-in w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Equipo elegido para combate!</p>
          </div>
        )}
      </main>

      {showModalCombatResult && <ModalCombatResult />}
    </>
  );
}

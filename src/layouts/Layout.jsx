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

      <main className="flex flex-col items-center w-full h-full px-20 pt-10 relative">
        <Outlet />

        {showModalPokemonAdded && (
          <div className="w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Pokémon añadido al equipo!</p>
          </div>
        )}
        {showModalSaveTeam && (
          <div className="w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Equipo guardado con éxito!</p>
          </div>
        )}
        {showModalSelectedTeam && (
          <div className="w-72 bg-blue-950 rounded-lg fixed right-4 bottom-4 z-50 shadow-2xl animate-bounce-short">
            <p className="text-white p-5">¡Equipo elegido para combate!</p>
          </div>
        )}
      </main>

      {showModalCombatResult && <ModalCombatResult />}
    </>
  );
}

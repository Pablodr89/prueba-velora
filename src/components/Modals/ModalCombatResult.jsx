import { BaseModal } from "./BaseModal";
import { useCombatStore } from "../../stores/useCombatStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../views/AppRoutes";
import { useContext } from "react";
import { ModalsContext } from "../../context/ContextModals";
import Button from "../Button";

export default function ModalCombatResult() {
  const { teamA, teamB, history, gameResult, combatEnded } = useCombatStore();
  const navigate = useNavigate();
  const { setShowModalCombatResult } = useContext(ModalsContext);

  const finishCombat = () => {
    setShowModalCombatResult(false);
    // Navegar de vuelta a la vista de equipos
    navigate(AppRoutes.Teams);
    // Reiniciar el estado del combate
    combatEnded();
  };

  return (
    <BaseModal>
      <div className="flex items-center bg-on-primary/90 w-full p-2 rounded-t-lg">
        <h3 className="md:text-xl text-surface font-semibold">
          Historial de Combates
        </h3>
      </div>

      <div className="flex h-full w-full flex-col items-center gap-6 pb-10">
        <div className="flex flex-col gap-2 px-5 pt-5 items-center overflow-y-auto w-full">
          {history.map((combat, index) => (
            <>
              <p className="md:text-xl font-medium" key={index}>
                Combate {index + 1}:{" "}
                <span className="capitalize">{combat.match[0]}</span> vs{" "}
                <span className="capitalize">{combat.match[1]}</span>{" "}
                <span className="capitalize hidden lg:inline-block">
                  - Ganador:
                </span>
                <span className="font-bold capitalize hidden lg:inline-block">
                  {combat.winner}
                </span>
              </p>

              <p className="md:text-xl font-medium lg:hidden">
                Ganador:{" "}
                <span className="font-bold capitalize">{combat.winner}</span>
              </p>
            </>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xl font-medium">
            Equipo {teamA.id}: {gameResult.statsA.alive} vivos,{" "}
            {gameResult.statsA.defeated} derrotados
          </p>
          <p className="text-xl font-medium">
            Equipo {teamB.id}: {gameResult.statsB.alive} vivos,{" "}
            {gameResult.statsB.defeated} derrotados
          </p>
        </div>

        <h3 className="text-4xl font-semibold text-green-600">
          Ganador: Equipo {gameResult.winner}
        </h3>

        <div className="flex justify-center">
          <Button
            typeButton="PRIMARY"
            text="Terminar combate"
            onClickHandler={() => finishCombat()}
          />
        </div>
      </div>
    </BaseModal>
  );
}

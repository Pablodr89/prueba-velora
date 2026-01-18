import TeamCardCombat from "../components/TeamCardCombat";
import Button from "../components/Button";
import { useCombatStore } from "../stores/useCombatStore";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";

export default function Combat() {
  const { teamA, teamB, runTournament, history, gameResult } = useCombatStore();
  const { setShowModalCombatResult } = useContext(ModalsContext);

  return (
    <div className="flex flex-col gap-5 w-full pb-5 3xl:pb-0">
      <h2 className="text-3xl font-bold text-center">Combate Pokemon</h2>

      <div className="flex items-center justify-start">
        <TeamCardCombat team={teamA} />
      </div>

      <div className="flex items-center justify-end">
        <TeamCardCombat team={teamB} />
      </div>

      {history.length === 0 && (
        <div className="flex justify-center mt-5">
          <Button
            text="Iniciar Combate"
            handledClick={() => runTournament()}
            customClasses="w-72"
          />
        </div>
      )}

      {gameResult && (
        <div className="flex justify-center mt-5">
          <Button
            text="Ver resultados"
            handledClick={() => setShowModalCombatResult(true)}
            customClasses="w-72"
          />
        </div>
      )}
    </div>
  );
}

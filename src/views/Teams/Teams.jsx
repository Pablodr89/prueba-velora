import TeamCard from "./components/TeamCard";
import DraftCard from "./components/DraftCard";
import { usePokemonStore } from "../../stores/usePokemonStore";
import Button from "../../components/Button";
import { useCombatStore } from "../../stores/useCombatStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";

export default function Teams() {
  const { teams, draft } = usePokemonStore();
  const { teamA, teamB } = useCombatStore();
  const teamsArray = Object.values(teams);
  const navigate = useNavigate();

  return (
    <div className="animate-in flex flex-col items-start w-full gap-8 py-20">
      <div className="flex justify-end w-full">
        <Button
          typeButton="PRIMARY"
          text="Empezar combate"
          handledClick={() => navigate(AppRoutes.Combat)}
          disabled={!teamA || !teamB}
        />
      </div>

      {/* Draft */}
      {draft && (
        <div className="flex flex-col gap-3">
          <h2 class="font-headline text-3xl font-bold tracking-tight">
            Borrador Actual
          </h2>
          <DraftCard team={draft} isDraft />
        </div>
      )}

      {/* Equipos cerrados */}
      <div className="flex flex-col gap-3">
        <h2 class="font-headline text-3xl font-bold tracking-tight">
          Equipos Guardados
        </h2>

        {teamsArray.length === 0 && <p>No hay equipos aún</p>}

        <div className="flex flex-col gap-4">
          {teamsArray.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}

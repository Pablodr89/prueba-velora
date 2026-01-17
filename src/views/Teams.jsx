import TeamCard from "../components/TeamCard";
import DraftCard from "../components/DraftCard";
import { usePokemonStore } from "../stores/usePokemonStore";
import Button from "../components/Button";
import { useCombatStore } from "../stores/useCombatStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../views/AppRoutes";

export default function Teams() {
  const { teams, draft } = usePokemonStore();
  const { teamA, teamB } = useCombatStore();
  const teamsArray = Object.values(teams);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start w-full p-4 gap-8">
      <div className="flex justify-end w-full">
        <Button
          text="Empezar combate"
          handledClick={() => navigate(AppRoutes.Combat)}
          disabled={!teamA || !teamB}
        />
      </div>

      {/* Draft */}
      {draft && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Borrador actual</h2>
          <DraftCard team={draft} isDraft />
        </div>
      )}

      {/* Equipos cerrados */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Equipos</h2>

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

import TeamCard from "../components/TeamCard";
import { usePokemonStore } from "../stores/usePokemonStore";

export default function Teams() {
  const { teams, draft } = usePokemonStore();
  const teamsArray = Object.values(teams);

  return (
    <div className="flex flex-col items-start w-full p-4 gap-8">
      {/* Draft */}
      {draft && (
        <div>
          <h2 className="text-xl font-bold">Borrador actual</h2>
          <TeamCard team={draft} isDraft />
        </div>
      )}

      {/* Equipos cerrados */}
      <div>
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

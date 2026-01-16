import { usePokemonStore } from "../stores/usePokemonStore";
import CardPokemonTeamCard from "./CardPokemonTeamCard";
import Button from "./Button";

export default function DraftCard({ team, isDraft = false }) {
  const { discardDraft } = usePokemonStore();
  return (
    <div className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg `}>
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>
      </div>

      <div className="flex items-center gap-3 mt-3 cursor-pointer">
        {team.pokemons.map((pokemon, index) => (
          <CardPokemonTeamCard
            isDraft={isDraft}
            team={team}
            pokemon={pokemon}
            index={index}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          text="Descartar borrador 🗑"
          handledClick={() => discardDraft(team.id)}
          deleted
        />
      </div>
    </div>
  );
}

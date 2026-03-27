import { usePokemonStore } from "../../../stores/usePokemonStore";
import CardPokemonTeamCard from "./CardPokemonTeamCard";
import Button from "../../../components/Button";

export default function DraftCard({ team, isDraft = true }) {
  const { discardDraft } = usePokemonStore();
  return (
    <div
      className={`flex flex-col gap-3 p-4 m-2 rounded-lg bg-surface-container group hover:shadow-lg transition-shadow`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex items-center gap-3 md:gap-5 lg:gap-3 mt-3 cursor-pointer">
        {team.pokemons.map((pokemon, index) => (
          <CardPokemonTeamCard
            key={pokemon.id}
            isDraft={isDraft}
            team={team}
            pokemon={pokemon}
            index={index}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          typeButton="TERTIARY"
          text="Descartar borrador 🗑"
          onClickHandler={() => discardDraft(team.id)}
          deleted
        />
      </div>
    </div>
  );
}

import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import Delete from "../images/x.svg";
import Button from "./Button";
import { usePokemonStore } from "../stores/usePokemonStore";

export default function CardPokemonTeamCard({ isDraft, pokemon, team, index }) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { removePokemonFromDraft } = usePokemonStore();

  return (
    <div
      data-label={pokemon.id}
      className={`flex flex-col border p-2 rounded-lg shadow-md relative ${bgColor}`}
      key={`${team.id}-${pokemon.id}-${index}`}
    >
      <div className="flex flex-col justify-between">
        <h2 className="text-start text-white text-xl capitalize font-semibold">
          {pokemon.name}
        </h2>
      </div>

      <div className="flex w-32 h-32 md:w-40 md:h-40">
        <img src={pokemon.image} alt={pokemon.name} className="object-cover" />
      </div>

      {isDraft && (
        <Button
          customClasses="absolute top-2 right-2 bg-transparent hover:bg-transparent !px-0 !py-0"
          icon={Delete}
          handledClick={() => removePokemonFromDraft(pokemon.id)}
        />
      )}
    </div>
  );
}

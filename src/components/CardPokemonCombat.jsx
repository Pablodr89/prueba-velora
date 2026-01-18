import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import { useCombatStore } from "../stores/useCombatStore";

export default function CardPokemonCombat({ pokemon }) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { defeatedIds } = useCombatStore();
  // Comprobamos si este pokemon específico ha perdido
  const isDefeated = defeatedIds.includes(pokemon.id);

  return (
    <div
      className={`flex flex-col border p-2 rounded-lg shadow-md relative ${bgColor} transition-opacity duration-500 ${isDefeated ? "opacity-30 grayscale" : "opacity-100"}`}
    >
      <div className="flex flex-col justify-between">
        <h2 className="text-start text-white text-xl capitalize font-semibold">
          {pokemon.name}
        </h2>
      </div>

      <div className="flex w-32 h-32 md:w-40 md:h-40">
        <img src={pokemon.image} alt={pokemon.name} className="object-cover" />
      </div>
    </div>
  );
}

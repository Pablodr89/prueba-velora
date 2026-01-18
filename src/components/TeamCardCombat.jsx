import CardPokemonCombat from "./CardPokemonCombat";
import { useCombatStore } from "../stores/useCombatStore";

export default function TeamCardCombat({ team }) {
  const { gameResult } = useCombatStore();

  return (
    <div
      className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg ${gameResult ? (team.id === gameResult.winner ? "border-green-500 bg-green-300" : "border-red-500 bg-red-300") : "border-gray-300 bg-white"}`}
    >
      <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex items-center gap-3 md:gap-5 lg:gap-3 mt-3 cursor-pointer">
        {team.pokemons.map((pokemon) => (
          <CardPokemonCombat key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

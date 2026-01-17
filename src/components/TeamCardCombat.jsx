import CardPokemonCombat from "./CardPokemonCombat";

export default function TeamCardCombat({ team }) {
  return (
    <div className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg `}>
      <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

      <div className="flex items-center gap-3 mt-3 cursor-pointer">
        {team.pokemons.map((pokemon) => (
          <CardPokemonCombat key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

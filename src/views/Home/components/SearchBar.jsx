export default function SearchBar({
  namePokemon,
  setNamePokemon,
  setFilterPokemon,
}) {
  return (
    <div className="w-full mb-5 px-2.5">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="border p-2 rounded-lg w-full"
        value={namePokemon}
        onChange={(e) => {
          setNamePokemon(e.target.value);
          setFilterPokemon("");
        }}
      />
    </div>
  );
}

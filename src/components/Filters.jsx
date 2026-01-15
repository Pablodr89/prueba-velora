import { useGetTypesPokemon } from "../hooks/useTypePokemon";

export default function Filters({
  filterPokemon,
  setFilterPokemon,
  setNamePokemon,
}) {
  const types = useGetTypesPokemon();

  return (
    <div className="flex flex-wrap items-center gap-4 w-full px-2.5 mb-5">
      <button
        onClick={() => {
          setFilterPokemon("");
          setNamePokemon("");
        }}
        className={`px-4 py-2 rounded-lg capitalize transition-colors ${
          filterPokemon === ""
            ? "bg-blue-950 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {types.map((type) => (
        <button
          key={type}
          onClick={() => {
            setFilterPokemon(type);
            setNamePokemon("");
          }}
          className={`px-4 py-2 rounded-lg capitalize transition-colors ${
            filterPokemon === type
              ? "bg-blue-950 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

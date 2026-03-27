import images from "../images/index";
import { useContext } from "react";
import { FiltersContext } from "../context/ContextFilters";

export default function SearchBar() {
  const { setFilterPokemon, namePokemon, setNamePokemon } =
    useContext(FiltersContext);

  return (
    <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
        <img
          src={images.search}
          alt="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-auto"
        />

        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="bg-white/10 border-none outline-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-indigo-300/50 w-64 transition-all"
          value={namePokemon}
          onChange={(e) => {
            setNamePokemon(e.target.value);
            setFilterPokemon("");
          }}
        />
      </div>
    </div>
  );
}

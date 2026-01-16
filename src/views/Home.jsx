import { useEffect, useRef, useState } from "react";
import { useGetPokemonList } from "../hooks/usePokemonList";
import { useSearchPokemon } from "../hooks/useSearchPokemon";
import { useFilterTypePokemon } from "../hooks/useTypePokemon";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner/Spinner";
import Filters from "../components/Filters";

export default function Home() {
  const [namePokemon, setNamePokemon] = useState("");
  const [filterPokemon, setFilterPokemon] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPokemonList();
  const { pokemonSearch, isSearchLoading, searchError } =
    useSearchPokemon(namePokemon);
  const { pokemonFilter, isFilterLoading } =
    useFilterTypePokemon(filterPokemon);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (namePokemon || filterPokemon) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, filterPokemon, hasNextPage, namePokemon]);

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar
        namePokemon={namePokemon}
        setNamePokemon={setNamePokemon}
        setFilterPokemon={setFilterPokemon}
      />

      <Filters
        filterPokemon={filterPokemon}
        setFilterPokemon={setFilterPokemon}
        setNamePokemon={setNamePokemon}
      />

      {isLoading || isSearchLoading || isFilterLoading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5 h-full w-full">
          {namePokemon ? (
            // Si hay búsqueda activa
            searchError ? (
              <div className="col-span-5 flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 font-bold text-lg">
                  ⚠️ Pokémon "{namePokemon}" no encontrado
                </p>
                <p className="text-red-400 text-sm">
                  Verifica que el nombre esté bien escrito
                </p>
              </div>
            ) : (
              pokemonSearch && <Card pokemon={pokemonSearch} />
            )
          ) : filterPokemon ? (
            pokemonFilter.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            data.pages.map((page) =>
              page.results.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))
            )
          )}

          <div ref={loadMoreRef} style={{ height: 80 }} />
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

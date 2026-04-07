import { useEffect, useRef } from "react";
import { useGetPokemonList } from "./hooks/usePokemonList";
import { useSearchPokemon } from "./hooks/useSearchPokemon";
import { useFilterTypePokemon } from "./hooks/useTypePokemon";
import Card from "./components/Card";
import Spinner from "../../components/Spinner/Spinner";
import Filters from "./components/Filters";
import ErrorSearchPokemon from "./components/ErrorSearchPokemon";
import SearchBar from "../../components/SearchBar";
import { useFilterStore } from "../../stores/useFilterStore";

export default function Home() {
  const { filterType, setFilterType } = useFilterStore();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPokemonList();
  const {
    pokemonSearch,
    isSearchLoading,
    searchError,
    namePokemon,
    setNamePokemon,
  } = useSearchPokemon();
  const { pokemonFilter, isFilterLoading } = useFilterTypePokemon(filterType);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (namePokemon) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, namePokemon]);

  return (
    <div className="animate-in flex flex-col items-center gap-8 w-full pt-20">
      <SearchBar customClasses="lg:hidden" />

      <Filters
        setNamePokemon={setNamePokemon}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {isLoading || isSearchLoading || isFilterLoading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5 h-full w-full">
          {pokemonSearch ? (
            // Si hay búsqueda activa
            searchError ? (
              <ErrorSearchPokemon namePokemon={namePokemon} />
            ) : (
              <Card pokemon={pokemonSearch} />
            )
          ) : pokemonFilter ? (
            pokemonFilter.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            data.pages.map((page) =>
              page.results.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              )),
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

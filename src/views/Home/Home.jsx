import { useEffect, useRef, useContext } from "react";
import { useGetPokemonList } from "./hooks/usePokemonList";
import { useSearchPokemon } from "./hooks/useSearchPokemon";
import { useFilterTypePokemon } from "./hooks/useTypePokemon";
import Card from "./components/Card";
import Spinner from "../../components/Spinner/Spinner";
import Filters from "./components/Filters";
import ErrorSearchPokemon from "./components/ErrorSearchPokemon";
import { FiltersContext } from "../../context/ContextFilters";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  const { filterPokemon, setFilterPokemon, namePokemon, setNamePokemon } =
    useContext(FiltersContext);
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
    <div className="flex flex-col items-center gap-8 w-full pt-20">
      <SearchBar customClasses="lg:hidden" />

      <Filters
        setFilterPokemon={setFilterPokemon}
        setNamePokemon={setNamePokemon}
      />

      {isLoading || isSearchLoading || isFilterLoading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5 h-full w-full">
          {namePokemon ? (
            // Si hay búsqueda activa
            searchError ? (
              <ErrorSearchPokemon namePokemon={namePokemon} />
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

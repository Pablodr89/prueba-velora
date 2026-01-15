import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner/Spinner";
import { useGetPokemonList } from "../hooks/usePokemonList";
import { useSearchPokemon } from "../hooks/useSearchPokemon";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [namePokemon, setNamePokemon] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPokemonList();
  const { pokemonSearch, isSearchLoading } = useSearchPokemon(namePokemon);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar namePokemon={namePokemon} setNamePokemon={setNamePokemon} />

      {isLoading || isSearchLoading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5 h-full w-full">
          {pokemonSearch ? (
            <Card pokemon={pokemonSearch} />
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

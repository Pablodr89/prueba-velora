import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner/Spinner";
import { useGetPokemonList } from "../hooks/usePokemonList";
import { useSearchPokemon } from "../hooks/useSearchPokemon";
import { useEffect, useRef } from "react";

export default function Home() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPokemonList();

  const { pokemon } = useSearchPokemon({ name: "pikachu" });

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

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar />

      <div className="grid grid-cols-5 gap-5 h-full w-full">
        {pokemon ? (
          <Card pokemon={pokemon} />
        ) : (
          data.pages.map((page) =>
            page.results.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))
          )
        )}

        <div ref={loadMoreRef} style={{ height: 80 }} />
      </div>

      {isFetchingNextPage && (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../api/pokeApi";
import { mapApiPokemon } from "../mappers/mapApiPokemon";

export const useSearchPokemon = (name) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const apiData = await searchPokemon(name);

      const pokemonDetail = await Promise.all(
        apiData.results.map(async (p) => {
          const res = await fetch(p.url);
          const full = await res.json();
          return mapApiPokemon(full);
        })
      );
      return pokemonDetail;
    },
  });

  return { pokemon: data, isLoading };
};

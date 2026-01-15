import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../api/pokeApi";
import { mapApiPokemon } from "../mappers/mapApiPokemon";

const LIMIT = 20;

export const useGetPokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    queryFn: async ({ pageParam = 0 }) => {
      const apiData = await getPokemonList(LIMIT, pageParam);

      const pokemonDetail = await Promise.all(
        apiData.results.map(async (p) => {
          const urlPokemon = await fetch(p.url);
          const details = await urlPokemon.json();
          return mapApiPokemon(details);
        })
      );

      return {
        results: pokemonDetail,
        nextOffset: pageParam + LIMIT,
        hasMore: !!apiData.next,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
  });
};

import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../api/pokeApi";
import { mapApiPokemon } from "../mappers/mapApiPokemon";

export const useSearchPokemon = (name = "") => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const apiData = await searchPokemon(name);
      return mapApiPokemon(apiData);
    },
    enabled: !!name && name.trim().length > 0,
  });

  return {
    pokemonSearch: data,
    isSearchLoading: isLoading,
    searchError: isError,
  };
};

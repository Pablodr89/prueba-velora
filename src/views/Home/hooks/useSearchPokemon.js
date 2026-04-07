import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../../../services/pokeApi";
import { mapApiPokemon } from "../../../mappers/mapApiPokemon";
import { useSearchStore } from "../../../stores/useSearchStore";
import { useEffect } from "react";

export const useSearchPokemon = () => {
  const { namePokemon, setNamePokemon, debouncedName, setDebouncedName } =
    useSearchStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(namePokemon);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namePokemon]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", debouncedName],
    queryFn: async () => {
      const apiData = await searchPokemon(debouncedName.toLowerCase());
      return mapApiPokemon(apiData);
    },
    enabled: !!namePokemon && namePokemon.trim().length > 0,
  });

  return {
    pokemonSearch: data,
    isSearchLoading: isLoading,
    searchError: isError,
    namePokemon,
    setNamePokemon,
  };
};

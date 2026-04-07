import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../../../services/pokeApi";
import { mapApiPokemon } from "../../../mappers/mapApiPokemon";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../context/Contexts";

export const useSearchPokemon = () => {
  const { namePokemon, setNamePokemon } = useContext(SearchContext);
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(namePokemon);
    }, 1000);

    return () => clearTimeout(timer);
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

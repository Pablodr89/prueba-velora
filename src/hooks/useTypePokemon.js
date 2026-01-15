import { useQuery } from "@tanstack/react-query";
import { getTypesPokemon, getFilterPokemon } from "../api/pokeApi";
import { mapApiPokemon } from "../mappers/mapApiPokemon";
import { useMemo } from "react";

export const useGetTypesPokemon = () => {
  const { data } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: async () => {
      const apiData = await getTypesPokemon();
      return apiData.results;
    },
  });

  // --- Tipos disponibles ---
  const types = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [
      ...new Set(data.filter((t) => t.name !== "unknown").map((t) => t.name)),
    ];
  }, [data]);

  return types;
};

export const useFilterTypePokemon = (type = "") => {
  const { data, isLoading } = useQuery({
    queryKey: ["pokemonFilter", type],
    queryFn: async () => {
      const apiData = await getFilterPokemon(type);

      const pokemonDetail = await Promise.all(
        apiData.pokemon.map(async (p) => {
          const urlPokemon = await fetch(p.pokemon.url);
          const details = await urlPokemon.json();
          return mapApiPokemon(details);
        })
      );
      return pokemonDetail;
    },
    enabled: !!type && type.trim().length > 0,
  });

  return { pokemonFilter: data, isFilterLoading: isLoading };
};

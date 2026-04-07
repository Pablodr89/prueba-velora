import { useQuery } from "@tanstack/react-query";
import { getTypesPokemon, getFilterPokemon } from "../../../services/pokeApi";
import { mapApiPokemon } from "../../../mappers/mapApiPokemon";
import { useMemo, useContext } from "react";
import { FiltersContext } from "../../../context/Contexts";

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
      ...new Set(
        data
          .filter((t) => t.name !== "unknown" && t.name !== "stellar")
          .map((t) => t.name),
      ),
    ];
  }, [data]);

  return types;
};

export const useFilterTypePokemon = () => {
  const { typePokemon, setTypePokemon } = useContext(FiltersContext);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemonFilter", typePokemon],
    queryFn: async () => {
      const apiData = await getFilterPokemon(typePokemon);

      const pokemonDetail = await Promise.all(
        apiData.pokemon.map(async (p) => {
          const urlPokemon = await fetch(p.pokemon.url);
          const details = await urlPokemon.json();
          return mapApiPokemon(details);
        }),
      );
      return pokemonDetail;
    },
    enabled: !!typePokemon && typePokemon.trim().length > 0,
  });

  return {
    pokemonFilter: data,
    isFilterLoading: isLoading,
    typePokemon,
    setTypePokemon,
  };
};

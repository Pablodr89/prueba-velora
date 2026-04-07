import { FiltersContext } from "./Contexts";
import { useMemo, useState } from "react";

export const FilterPokemonContextProvider = ({ children }) => {
  const [typePokemon, setTypePokemon] = useState("");

  const value = useMemo(() => ({ typePokemon, setTypePokemon }), [typePokemon]);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

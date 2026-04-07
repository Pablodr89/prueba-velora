import { SearchContext } from "./Contexts";
import { useMemo, useState } from "react";

export const SearchPokemonContextProvider = ({ children }) => {
  const [namePokemon, setNamePokemon] = useState("");

  const value = useMemo(() => ({ namePokemon, setNamePokemon }), [namePokemon]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

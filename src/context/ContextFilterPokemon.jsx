import { useState } from "react";
import { FiltersContext } from "./ContextFilters";

export const FiltersContextProvider = ({ children }) => {
  const [filterPokemon, setFilterPokemon] = useState("");
  const [namePokemon, setNamePokemon] = useState("");

  return (
    <FiltersContext.Provider
      value={{
        filterPokemon,
        setFilterPokemon,
        namePokemon,
        setNamePokemon,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

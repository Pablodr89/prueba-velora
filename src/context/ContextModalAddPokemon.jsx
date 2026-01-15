import { useState } from "react";
import { ModalsContext } from "./ContextModals";

export const ModalsContextProvider = ({ children }) => {
  const [showModalPokemonAdded, setShowModalPokemonAdded] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        showModalPokemonAdded,
        setShowModalPokemonAdded,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

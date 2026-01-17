import { useState } from "react";
import { ModalsContext } from "./ContextModals";

export const ModalsContextProvider = ({ children }) => {
  const [showModalPokemonAdded, setShowModalPokemonAdded] = useState(false);
  const [showModalSaveTeam, setShowModalSaveTeam] = useState(false);
  const [showModalSelectedTeam, setShowModalSelectedTeam] = useState(false);
  const [showModalCombatResult, setShowModalCombatResult] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        showModalPokemonAdded,
        setShowModalPokemonAdded,
        showModalSaveTeam,
        setShowModalSaveTeam,
        showModalSelectedTeam,
        setShowModalSelectedTeam,
        showModalCombatResult,
        setShowModalCombatResult,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

import { useMemo, useState } from "react";
import { ModalsContext } from "./Contexts";

export const ModalsContextProvider = ({ children }) => {
  const [showModalPokemonAdded, setShowModalPokemonAdded] = useState(false);
  const [showModalSaveTeam, setShowModalSaveTeam] = useState(false);
  const [showModalSelectedTeam, setShowModalSelectedTeam] = useState(false);
  const [showModalCombatResult, setShowModalCombatResult] = useState(false);

  const value = useMemo(
    () => ({
      showModalPokemonAdded,
      setShowModalPokemonAdded,
      showModalSaveTeam,
      setShowModalSaveTeam,
      showModalSelectedTeam,
      setShowModalSelectedTeam,
      showModalCombatResult,
      setShowModalCombatResult,
    }),
    [
      showModalPokemonAdded,
      showModalSaveTeam,
      showModalSelectedTeam,
      showModalCombatResult,
    ],
  );

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
};

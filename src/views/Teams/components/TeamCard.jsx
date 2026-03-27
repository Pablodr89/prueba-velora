import { usePokemonStore } from "../../../stores/usePokemonStore";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Button from "../../../components/Button";
import CardPokemonTeamCard from "./CardPokemonTeamCard";
import { useCombatStore } from "../../../stores/useCombatStore";
import { useContext, useState } from "react";
import { ModalsContext } from "../../../context/ContextModals";

export default function TeamCard({ team, isDraft = false }) {
  const {
    removeTeam,
    sortTeamByAttack,
    shuffleTeam,
    saveTeamOrder,
    tempOrders,
    setManualOrder,
  } = usePokemonStore();
  const { selectTeam, teamA, teamB, discardTeam } = useCombatStore();
  const { setShowModalSaveTeam, setShowModalSelectedTeam } =
    useContext(ModalsContext);
  const initialPokemons = tempOrders[team.id] || team.pokemons;
  const hasChanges = !!tempOrders[team.id];
  const [teamChoosed, setTeamChoosed] = useState(false);
  const [parent, displayPokemons, setValues] = useDragAndDrop(initialPokemons, {
    // Esta función se dispara cada vez que terminas de arrastrar
    onDragend: (data) => {
      // 1. 'data.values' contiene el nuevo orden del array
      const newOrder = data.values;

      // 2. Actualizamos el store para que aparezca el botón de "Guardar"
      setManualOrder(team.id, newOrder);
    },
  });

  const handleShuffle = () => {
    // 1. Ejecutamos la lógica del store y obtenemos el nuevo orden
    const newOrder = shuffleTeam(team.id);
    // 2. Le decimos al Drag and Drop que actualice la vista
    setValues(newOrder);
  };

  const handleSortAttack = () => {
    // 1. Ejecutamos la lógica del store y obtenemos el nuevo orden
    const newOrder = sortTeamByAttack(team.id);
    // 2. Le decimos al Drag and Drop que actualice la vista
    setValues(newOrder);
  };

  const saveTeam = () => {
    saveTeamOrder(team.id);
    setShowModalSaveTeam(true);
    setTimeout(() => {
      setShowModalSaveTeam(false);
    }, 1500);
  };

  const chooseTeamForCombat = () => {
    selectTeam(team);
    setTeamChoosed(true);
    setShowModalSelectedTeam(true);
    setTimeout(() => {
      setShowModalSelectedTeam(false);
    }, 1500);
  };

  return (
    <div
      className={`flex flex-col gap-3 p-4 m-2 bg-surface-container rounded-lg group hover:shadow-lg transition-shadow ${team.id === teamA?.id || team.id === teamB?.id ? "border-4 border-blue-900" : "border border-gray-300"}`}
    >
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <Button
            typeButton="SECONDARY"
            text="Orden aleatorio 🔀"
            handledClick={() => handleShuffle()}
          />

          <Button
            typeButton="SECONDARY"
            text="Ordenar por ataque ⚔️"
            handledClick={() => handleSortAttack()}
          />
        </div>
      </div>

      <div
        ref={parent}
        className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap items-center gap-3 md:gap-5 lg:gap-3 mt-3"
      >
        {displayPokemons.map((pokemon, index) => (
          <CardPokemonTeamCard
            key={pokemon.id}
            isDraft={isDraft}
            team={team}
            pokemon={pokemon}
            index={index}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-0 mt-5">
        {teamChoosed ? (
          <Button
            typeButton="TERTIARY"
            text="Descartar equipo"
            handledClick={() => {
              discardTeam(team);
              setTeamChoosed(false);
            }}
          />
        ) : (
          <Button
            typeButton="PRIMARY"
            text="Elegir para combate 🤼"
            handledClick={() => chooseTeamForCombat()}
          />
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-end gap-3">
          {hasChanges && (
            <Button
              typeButton="PRIMARY"
              text="Guardar equipo 💾"
              handledClick={() => saveTeam()}
            />
          )}

          <Button
            typeButton="TERTIARY"
            text="Eliminar equipo 🗑"
            handledClick={() => removeTeam(team.id)}
          />
        </div>
      </div>
    </div>
  );
}

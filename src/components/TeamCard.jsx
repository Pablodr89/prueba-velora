import { usePokemonStore } from "../stores/usePokemonStore";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Button from "./Button";
import CardPokemonTeamCard from "./CardPokemonTeamCard";
import { useCombatStore } from "../stores/useCombatStore";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";

export default function TeamCard({ team, isDraft = false }) {
  const {
    removeTeam,
    sortTeamByAttack,
    shuffleTeam,
    saveTeamOrder,
    tempOrders,
    setManualOrder,
  } = usePokemonStore();
  const { selectTeam } = useCombatStore();
  const { setShowModalSaveTeam, setShowModalSelectedTeam } =
    useContext(ModalsContext);
  const initialPokemons = tempOrders[team.id] || team.pokemons;
  const hasChanges = !!tempOrders[team.id];
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
    setShowModalSelectedTeam(true);
    setTimeout(() => {
      setShowModalSelectedTeam(false);
    }, 1500);
  };

  return (
    <div className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg `}>
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

        <div className="flex items-center gap-5">
          <Button
            text="Orden aleatorio 🔀"
            handledClick={() => handleShuffle()}
          />

          <Button
            text="Ordenar por ataque ⚔️"
            handledClick={() => handleSortAttack()}
          />
        </div>
      </div>

      <div ref={parent} className="flex items-center gap-3 mt-3 cursor-pointer">
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

      <div className="flex justify-between">
        <Button
          text="Elegir para combate 🤼"
          handledClick={() => chooseTeamForCombat()}
        />

        <div className="flex items-center justify-end gap-3">
          {hasChanges && (
            <Button text="Guardar equipo 💾" handledClick={() => saveTeam()} />
          )}

          <Button
            text="Eliminar equipo 🗑"
            handledClick={() => removeTeam(team.id)}
            deleted
          />
        </div>
      </div>
    </div>
  );
}

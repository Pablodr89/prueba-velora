import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import { usePokemonStore } from "../stores/usePokemonStore";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export default function TeamCard({ team, isDraft = false }) {
  const {
    discardDraft,
    removeTeam,
    sortTeamByAttack,
    shuffleTeam,
    saveTeamOrder,
    tempOrders,
    setManualOrder,
  } = usePokemonStore();
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

  return (
    <div className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg `}>
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

        {!isDraft && (
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleShuffle()}
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Orden aleatorio 🔀
            </button>

            <button
              onClick={() => handleSortAttack()}
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ordenar por ataque ⚔️
            </button>
          </div>
        )}
      </div>

      <div ref={parent} className="flex items-center gap-3 mt-3 cursor-pointer">
        {displayPokemons.map((pokemon, index) => {
          const bgColor = getBackgroundColorByType(pokemon.type[0]);

          return (
            <div
              data-label={pokemon.id}
              className={`flex flex-col border p-2 rounded-lg shadow-md ${bgColor}`}
              key={`${team.id}-${pokemon.id}-${index}`}
            >
              <div className="flex flex-col justify-between">
                <h2 className="text-start text-white text-xl capitalize font-semibold">
                  {pokemon.name}
                </h2>
              </div>

              <div className="flex w-40 h-40">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {isDraft ? (
        <button
          onClick={() => discardDraft(team.id)}
          className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
        >
          Descartar borrador
        </button>
      ) : (
        <div className="flex items-center justify-end gap-3">
          {hasChanges && (
            <button
              onClick={() => saveTeamOrder(team.id)}
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar equipo 💾
            </button>
          )}

          <button
            onClick={() => removeTeam(team.id)}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar equipo
          </button>
        </div>
      )}
    </div>
  );
}

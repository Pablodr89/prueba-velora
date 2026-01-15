import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import { usePokemonStore } from "../stores/usePokemonStore";

export default function TeamCard({ team, isDraft = false }) {
  const { discardDraft, removeTeam } = usePokemonStore();

  return (
    <div className={`flex flex-col gap-3 border p-4 m-2 rounded-lg shadow-lg `}>
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg font-bold mr-2">Equipo {team.id}</h2>

        {!isDraft && (
          <div className="flex items-center gap-5">
            <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Orden aleatorio
            </button>

            <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Ordenar por ataque
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-3">
        {team.pokemons.map((pokemon) => {
          console.log("type", pokemon.type[0]);
          const bgColor = getBackgroundColorByType(pokemon.type[0]);

          return (
            <div
              className={`flex flex-col border p-2 rounded-lg shadow-md ${bgColor}`}
              key={pokemon.name}
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
          <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Guardar equipo
          </button>

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

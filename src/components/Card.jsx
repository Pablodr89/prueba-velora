import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import Plus from "../images/plus.svg";
import { usePokemonStore } from "../stores/usePokemonStore";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";

export default function Card({ pokemon }) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { addPokemonAuto } = usePokemonStore();
  const { setShowModalPokemonAdded } = useContext(ModalsContext);

  const addPokemon = (pokemon) => {
    addPokemonAuto(pokemon);
    setShowModalPokemonAdded(true);

    setTimeout(() => {
      setShowModalPokemonAdded(false);
    }, 3000);
  };

  return (
    <div
      className={`flex border p-4 m-2 rounded-lg shadow-lg relative h-40 group ${bgColor}`}
    >
      <div className="flex flex-col justify-between w-full">
        <h2 className="text-start text-white text-xl capitalize font-semibold">
          {pokemon.name}
        </h2>

        <button
          onClick={() => addPokemon(pokemon)}
          className="text-white absolute top-2 right-2"
        >
          <img src={Plus} alt="icon plus" className="object-cover" />
        </button>

        <div className="flex justify-start items-end gap-5">
          {pokemon.type.map((type) => (
            <span
              key={type}
              className="inline-block capitalize text-lg font-semibold text-white"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-40 h-40 self-end absolute top-8 -right-8">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

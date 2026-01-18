import { getBackgroundColorByType } from "../utils/BackgroundColorCard";
import Plus from "../images/plus.svg";
import { usePokemonStore } from "../stores/usePokemonStore";
import { useContext } from "react";
import { ModalsContext } from "../context/ContextModals";
import Button from "./Button";

export default function Card({ pokemon }) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { addPokemonAuto } = usePokemonStore();
  const { setShowModalPokemonAdded } = useContext(ModalsContext);

  const addPokemon = (pokemon) => {
    addPokemonAuto(pokemon);
    setShowModalPokemonAdded(true);

    setTimeout(() => {
      setShowModalPokemonAdded(false);
    }, 1500);
  };

  return (
    <div
      className={`flex border p-4 m-2 rounded-lg shadow-lg relative h-40 group ${bgColor}`}
    >
      <div className="flex flex-col justify-between w-full">
        <h2 className="text-start text-white md:text-xl capitalize font-semibold">
          {pokemon.name}
        </h2>

        <Button
          customClasses="absolute top-2 right-2 bg-transparent hover:bg-transparent !px-0 !py-0"
          icon={Plus}
          handledClick={() => addPokemon(pokemon)}
        />

        <div className="flex flex-col md:flex-row justify-start md:items-end md:gap-5">
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

      <div className="flex w-20 h-20 md:w-40 md:h-40 self-end absolute top-24 md:top-8 -right-5 md:-right-8">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

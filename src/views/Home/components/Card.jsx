import { getBackgroundColorByType } from "../../../utils/BackgroundColorCard";
import { usePokemonStore } from "../../../stores/usePokemonStore";
import { useContext } from "react";
import { ModalsContext } from "../../../context/ContextModals";
import Button from "../../../components/Button";

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
      className={`${bgColor} rounded-3xl p-8 flex flex-col group relative transition-all overflow-hidden shadow-xl shadow-blue-200/50`}
    >
      <div className="absolute inset-0 card-texture"></div>
      <div className="flex justify-between items-start mb-10 z-10">
        <div>
          <span className="font-inter text-xs font-bold text-white/60 tracking-widest block mb-1">
            {pokemon.id}
          </span>

          <h3 className="font-headline font-bold text-3xl text-white tracking-tight">
            {pokemon.name}
          </h3>
        </div>

        <Button
          onClick={() => addPokemon(pokemon)}
          text="+"
          customClasses="w-12 h-12 rounded-2xl cursor-pointer bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-all hover:bg-white hover:text-blue-600"
        />
      </div>

      <div className="h-48 flex items-center justify-center relative z-10">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>

        <img
          alt="pokemon image"
          className="w-full h-full object-contain pokemon-breakout group-hover:scale-110 transition-all duration-500"
          src={pokemon.image}
        />
      </div>

      <div className="flex gap-2 z-10">
        {pokemon.type.map((type, i) => (
          <span
            key={i}
            className="px-4 py-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

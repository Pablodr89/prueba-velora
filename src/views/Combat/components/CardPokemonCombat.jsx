import { getBackgroundColorByType } from "../../../utils/BackgroundColorCard";
import { useCombatStore } from "../../../stores/useCombatStore";

export default function CardPokemonCombat({ pokemon }) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { defeatedIds } = useCombatStore();
  // Comprobamos si este pokemon específico ha perdido
  const isDefeated = defeatedIds.includes(pokemon.id);

  return (
    <div
      className={`${isDefeated ? "opacity-30 grayscale" : "opacity-100"} ${bgColor} rounded-xl p-3 lg:p-6 flex flex-col lg:flex-row items-center relative group transition-all duration-500 hover:bg-surface-container`}
    >
      <div className="w-32 h-32 shrink-0 relative z-10">
        <img
          alt="pokemon image"
          className="object-contain w-full h-full"
          src={pokemon.image}
        />
      </div>

      <div className="hidden lg:inline-block ml-6 grow">
        <div className="flex items-center gap-2 mb-3">
          {pokemon.type.map((type, i) => (
            <span
              key={i}
              className="px-3 py-0.5 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-xs font-label uppercase tracking-wider"
            >
              {type}
            </span>
          ))}
        </div>

        <h3 className="font-headline font-extrabold capitalize text-surface text-2xl text-on-primary/90-container leading-none mb-2 tracking-tight">
          {pokemon.name}
        </h3>

        <div className="flex gap-4">
          <div>
            <p className="font-label text-sm uppercase text-black font-bold tracking-widest">
              DEF
            </p>

            <p className="font-headline font-bold text-lg text-surface">
              {pokemon.defense}
            </p>
          </div>

          <div>
            <p className="font-label text-sm uppercase text-black font-bold tracking-widest">
              ATK
            </p>

            <p className="font-headline font-bold text-lg text-surface">
              {pokemon.attack}
            </p>
          </div>

          <div>
            <p className="font-label text-sm uppercase text-black font-bold tracking-widest">
              SPD
            </p>

            <p className="font-headline font-bold text-lg text-surface">
              {pokemon.speed}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:inline-block absolute right-6 top-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="font-headline font-black text-6xl italic">
          #{pokemon.id}
        </span>
      </div>
    </div>
  );
}

import { getBackgroundColorByType } from "../utils/BackgroundColorCard";

export default function Card({ pokemon }) {
  let bgColor = getBackgroundColorByType(pokemon.type[0]);

  return (
    <div
      className={`flex border p-4 m-2 rounded-lg shadow-lg relative h-40 group ${bgColor}`}
    >
      <div className="flex flex-col justify-between">
        <h2 className="text-start text-white text-xl capitalize font-semibold">
          {pokemon.name}
        </h2>

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

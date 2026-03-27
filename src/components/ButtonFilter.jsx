import { useContext } from "react";
import { FiltersContext } from "../context/ContextFilters";

export default function ButtonFilter({ title, onClickHandler, type }) {
  const { filterPokemon } = useContext(FiltersContext);
  return (
    <button
      onClick={onClickHandler}
      className={`px-6 py-2 rounded-full cursor-pointer font-inter text-xs font-bold uppercase tracking-widest transition-all ${
        filterPokemon === type
          ? "bg-primary text-on-primary"
          : "bg-surface-container hover:bg-surface-variant text-on-surface-variant"
      }`}
    >
      {title}
    </button>
  );
}

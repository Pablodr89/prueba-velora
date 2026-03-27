import ButtonFilter from "../../../components/ButtonFilter";
import { useGetTypesPokemon } from "../hooks/useTypePokemon";

export default function Filters({ setFilterPokemon, setNamePokemon }) {
  const types = useGetTypesPokemon();

  return (
    <div className="flex flex-wrap items-center gap-4 w-full px-2.5">
      <ButtonFilter
        title="All"
        type=""
        onClickHandler={() => {
          setFilterPokemon("");
          setNamePokemon("");
        }}
      />

      {types.map((type, i) => (
        <ButtonFilter
          key={i}
          title={type}
          type={type}
          onClickHandler={() => {
            setFilterPokemon(type);
            setNamePokemon("");
          }}
        />
      ))}
    </div>
  );
}

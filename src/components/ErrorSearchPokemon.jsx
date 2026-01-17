export default function ErrorSearchPokemon({ namePokemon }) {
  return (
    <div className="col-span-5 flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg border border-red-200">
      <p className="text-red-600 font-bold text-lg">
        ⚠️ Pokémon "{namePokemon}" no encontrado
      </p>
      <p className="text-red-400 text-sm">
        Verifica que el nombre esté bien escrito
      </p>
    </div>
  );
}

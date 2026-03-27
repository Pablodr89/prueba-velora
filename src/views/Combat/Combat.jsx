import Button from "../../components/Button";
import { useCombatStore } from "../../stores/useCombatStore";
import { useContext, useState } from "react";
import { ModalsContext } from "../../context/ContextModals";
import CardPokemonCombat from "./components/CardPokemonCombat";

export default function Combat() {
  const { teamA, teamB, runTournament, history, gameResult } = useCombatStore();
  const { setShowModalCombatResult } = useContext(ModalsContext);
  const [combatOn, setCombatOn] = useState(false);

  return (
    <div className="animate-in flex flex-col gap-5 w-full pb-5 3xl:pb-0 pt-20">
      <div className="flex flex-col gap-6 mb-5">
        <h1 className="text-center font-headline font-extrabold text-5xl md:text-6xl text-on-primary-container tracking-tighter">
          Combate Pokemon
        </h1>
        <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
      </div>

      {history.length === 0 && (
        <div className="flex justify-center mb-5">
          <Button
            typeButton="PRIMARY"
            text="Iniciar Combate"
            handledClick={() => {
              runTournament();
              setCombatOn(true);
            }}
            disabled={combatOn}
            customClasses="w-72 flex justify-center items-center text-xl"
          />
        </div>
      )}

      {gameResult && (
        <div className="flex justify-center mb-5">
          <Button
            typeButton="PRIMARY"
            text="Ver resultados"
            handledClick={() => setShowModalCombatResult(true)}
            customClasses="w-72 flex justify-center items-center text-xl"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div class="flex items-baseline justify-between px-2">
            <h2 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight">
              Equipo {teamA.id}
            </h2>
          </div>

          <div className="grid gap-4 ">
            {teamA.pokemons.map((pokemon) => (
              <CardPokemonCombat key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div class="flex items-baseline justify-between px-2">
            <h2 class="font-headline font-bold text-2xl text-on-surface uppercase tracking-tight">
              Equipo {teamB.id}
            </h2>
          </div>

          <div className="grid gap-4">
            {teamB.pokemons.map((pokemon) => (
              <CardPokemonCombat key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

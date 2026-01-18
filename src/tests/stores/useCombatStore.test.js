import { useCombatStore } from "../../stores/useCombatStore";

// Mock de la estructura inicial si es necesario
const mockTeamA = {
  id: "team-fuego",
  nombre: "Equipo Fuego",
  pokemons: [
    { id: 1, name: "Charizard", attack: 100, defense: 80, speed: 100 },
  ],
};

const mockTeamB = {
  id: "team-agua",
  nombre: "Equipo Agua",
  pokemons: [{ id: 2, name: "Blastoise", attack: 85, defense: 100, speed: 78 }],
};

describe("Pruebas de Lógica Funcional: runTournament", () => {
  beforeEach(() => {
    // 1. Activar timers falsos PRIMERO
    jest.useFakeTimers();

    // 2. Verificar que el store existe antes de usarlo
    if (!useCombatStore || !useCombatStore.getState) {
      throw new Error("El store de Zustand no se importó correctamente.");
    }

    const { combatEnded } = useCombatStore.getState();
    combatEnded();
  });

  afterEach(() => {
    // Limpiar timers y volver a los reales
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("Debería debilitar al defensor si el atacante más rápido tiene más ataque que defensa", async () => {
    const store = useCombatStore.getState();

    // Seteamos los equipos directamente para el test
    useCombatStore.setState({ teamA: mockTeamA, teamB: mockTeamB });

    // Iniciamos el torneo (es async)
    const tournamentPromise = store.runTournament();

    // Adelantamos 3 segundos para que se ejecute el primer combate
    jest.advanceTimersByTime(3000);

    // Esperamos a que la promesa se resuelva
    await tournamentPromise;

    const state = useCombatStore.getState();

    // Verificaciones de lógica
    // Charizard (Speed 100) vs Blastoise (Speed 78) -> Charizard ataca primero.
    // Charizard Atk (100) > Blastoise Def (100) es FALSO.
    // Blastoise Atk (85) > Charizard Def (80) es VERDADERO.
    // GANADOR ESPERADO: Blastoise (Team B)

    expect(state.gameResult.winner).toBe(mockTeamB.id);
    expect(state.defeatedIds).toContain(1); // Charizard (ID 1) debe estar en defeatedIds
    expect(state.history[0].winner).toBe("Blastoise");
  });

  test("Debería ganar el más rápido si ninguno supera la defensa del otro", async () => {
    // Caso de empate técnico: Ataques bajos, Defensas altas
    const pRápido = {
      id: 10,
      name: "Pikachu",
      attack: 10,
      defense: 100,
      speed: 200,
    };
    const pLento = {
      id: 20,
      name: "Metapod",
      attack: 10,
      defense: 100,
      speed: 10,
    };

    useCombatStore.setState({
      teamA: { id: "A", pokemons: [pRápido] },
      teamB: { id: "B", pokemons: [pLento] },
    });

    const tournamentPromise = useCombatStore.getState().runTournament();
    jest.advanceTimersByTime(3000);
    await tournamentPromise;

    const state = useCombatStore.getState();

    // Según tu regla 4: "Si ningún pokémon supera la defensa del otro, gana el más rápido"
    expect(state.gameResult.winner).toBe("A");
    expect(state.defeatedIds).toContain(20);
  });
});

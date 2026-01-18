import { create } from "zustand";

export const useCombatStore = create((set, get) => ({
  teamA: null,
  teamB: null,
  history: [], // Guarda el ganador de cada micro-combate
  gameResult: null, // Resultado global
  defeatedIds: [], // Estado para controlar el perdedor

  //Elige equipo según el orden de pulsación
  selectTeam: (team) => {
    const { teamA, teamB } = get();

    if (!teamA) {
      // Si no hay ninguno, este es el A
      set({ teamA: team });
    } else if (!teamB) {
      //Si el id del B es igual al A, no dejar seleccionarlo
      if (team.id === teamA.id) {
        alert("Ya has elegido este equipo como Equipo A. Elige otro.");
        return;
      }
      // Si ya hay A pero no B, este es el B
      set({ teamB: team });
    } else {
      // 3. Si ambos ya están elegidos, lanzamos el alert
      alert(
        "Ya has elegido los dos equipos. ¡Haz clic en Combatir o reinicia la selección!",
      );
    }
  },

  combatEnded: () => {
    set(() => ({
      teamA: null,
      teamB: null,
      history: [],
      gameResult: null,
      defeatedIds: [],
    }));
  },

  runTournament: async () => {
    const { teamA, teamB } = get();
    if (!teamA || !teamB) return;

    // Resetear estados al empezar
    set({ history: [], gameResult: null, defeatedIds: [] });

    let i = 0;
    let j = 0;
    const team1 = [...teamA.pokemons];
    const team2 = [...teamB.pokemons];

    while (i < team1.length && j < team2.length) {
      const p1 = team1[i];
      const p2 = team2[j];

      // ESPERA DE 3 SEGUNDOS: Creamos una pausa antes de resolver el combate
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const fast = p1.speed >= p2.speed ? p1 : p2;
      const slow = p1.speed >= p2.speed ? p2 : p1;

      let winner;
      if (fast.attack > slow.defense) winner = fast;
      else if (slow.attack > fast.defense) winner = slow;
      else winner = fast;

      // Identificar al perdedor y actualizar defeatedIds
      const loser = winner === p1 ? p2 : p1;
      set((state) => ({
        defeatedIds: [...state.defeatedIds, loser.id],
        history: [
          ...state.history,
          { match: [p1.name, p2.name], winner: winner.name },
        ],
      }));

      winner === p1 ? j++ : i++;
    }

    // Resultado final al terminar el bucle
    set({
      gameResult: {
        winner: i < team1.length ? teamA.id : teamB.id,
        statsA: { alive: team1.length - i, defeated: i },
        statsB: { alive: team2.length - j, defeated: j },
      },
    });
  },
}));

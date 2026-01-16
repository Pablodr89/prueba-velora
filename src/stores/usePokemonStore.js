import { create } from "zustand";
import { persist } from "zustand/middleware";

const getNextId = (teams, draft) => {
  const teamIds = teams.map((t) => t.id);
  const draftId = draft ? [draft.id] : [];
  const allIds = [...teamIds, ...draftId];

  // Si no hay nada, empezamos en 1.
  // Si hay, buscamos el máximo y le sumamos 1.
  return allIds.length === 0 ? 1 : Math.max(...allIds) + 1;
};

export const usePokemonStore = create(
  persist(
    (set) => ({
      teams: [], // 1. Estado para guardar órdenes temporales (ID equipo -> lista de pokemons)
      tempOrders: {},
      draft: null,

      addPokemonAuto: (pokemon) =>
        set((state) => {
          const currentTeams = Array.isArray(state.teams) ? state.teams : [];
          let currentDraft = state.draft;

          // 1. Si no hay borrador, calculamos el ID correcto en este momento
          if (!currentDraft) {
            const nextId = getNextId(currentTeams, null);
            currentDraft = { id: nextId, pokemons: [], isDraft: true };
          }

          const updatedPokemons = [...currentDraft.pokemons, pokemon];

          // 2. Si llegamos a 6, cerramos el equipo
          if (updatedPokemons.length === 6) {
            const finalTeam = {
              ...currentDraft,
              pokemons: updatedPokemons,
              isDraft: false,
            };
            return {
              teams: [...currentTeams, finalTeam],
              draft: null,
            };
          }

          // 3. Si no, actualizamos el borrador
          return {
            draft: { ...currentDraft, pokemons: updatedPokemons },
            teams: currentTeams,
          };
        }),

      discardDraft: () => set({ draft: null }),

      removeTeam: (teamId) =>
        set((state) => ({
          teams: state.teams.filter((t) => t.id !== teamId),
        })),

      // Función para ordenar por ataque
      sortTeamByAttack: (teamId) => {
        let sorted = [];
        set((state) => {
          const team = state.teams.find((t) => t.id === teamId);
          if (!team) return state;

          sorted = [...team.pokemons].sort((a, b) => b.attack - a.attack);

          return {
            tempOrders: { ...state.tempOrders, [teamId]: sorted },
          };
        });
        return sorted; // Retornamos el array para que el componente lo use
      },

      // Función para orden aleatorio
      shuffleTeam: (teamId) => {
        let shuffled = [];
        set((state) => {
          const team = state.teams.find((t) => t.id === teamId);
          if (!team) return state;

          shuffled = [...team.pokemons].sort(() => Math.random() - 0.5);

          return {
            tempOrders: { ...state.tempOrders, [teamId]: shuffled },
          };
        });
        return shuffled; // Retornamos el array para que el componente lo use
      },

      // Orden MANUAL desde Drag and Drop
      setManualOrder: (teamId, newOrder) =>
        set((state) => ({
          tempOrders: {
            ...state.tempOrders,
            [teamId]: newOrder,
          },
        })),

      // Función para GUARDAR los cambios manualmente
      saveTeamOrder: (teamId) =>
        set((state) => {
          const newOrder = state.tempOrders[teamId];
          if (!newOrder) return state;

          const updatedTeams = state.teams.map((t) =>
            t.id === teamId ? { ...t, pokemons: newOrder } : t
          );

          // Limpiamos el temporal de este equipo tras guardar
          const nextTempOrders = { ...state.tempOrders };
          delete nextTempOrders[teamId];

          return {
            teams: updatedTeams,
            tempOrders: nextTempOrders,
          };
        }),

      removePokemonFromDraft: (pokemonId) =>
        set((state) => {
          if (!state.draft) return state;

          // Creamos un nuevo array filtrado
          const updatedPokemons = state.draft.pokemons.filter(
            (p) => p.id !== pokemonId
          );

          // Si ya no quedan pokemons, eliminamos el borrador por completo
          if (updatedPokemons.length === 0) {
            return { draft: null };
          }

          // RETORNAMOS UN NUEVO OBJETO DRAFT
          // Esto fuerza a React a re-renderizar la UI
          return {
            draft: {
              ...state.draft,
              pokemons: updatedPokemons,
            },
          };
        }),
    }),
    {
      name: "pokemon-storage",
      // Evitamos que tempOrders se guarde en el localStorage
      partialize: (state) => ({ teams: state.teams, draft: state.draft }),
    }
  )
);

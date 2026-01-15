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
  persist((set) => ({
    teams: [],
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
  }))
);

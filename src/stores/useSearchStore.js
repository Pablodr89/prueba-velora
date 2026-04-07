import { create } from "zustand";

export const useSearchStore = create((set) => ({
  namePokemon: "",
  debouncedName: "", // valor que usa la query
  setNamePokemon: (name) => set({ namePokemon: name }),
  setDebouncedName: (name) => set({ debouncedName: name }),
}));

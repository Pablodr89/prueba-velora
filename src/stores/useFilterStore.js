import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filterType: "",
  setFilterType: (type) => set({ filterType: type }),
}));

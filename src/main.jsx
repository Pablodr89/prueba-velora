import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsContextProvider } from "./context/ContextModalAddPokemon.jsx";
import { FilterPokemonContextProvider } from "./context/ContextFilterPokemon.jsx";
import { SearchPokemonContextProvider } from "./context/ContextSearchPokemon.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalsContextProvider>
        <FilterPokemonContextProvider>
          <SearchPokemonContextProvider>
            <App />
          </SearchPokemonContextProvider>
        </FilterPokemonContextProvider>
      </ModalsContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);

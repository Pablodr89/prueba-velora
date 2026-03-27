import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsContextProvider } from "./context/ContextModalAddPokemon.jsx";
import { FiltersContextProvider } from "./context/ContextFilterPokemon.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalsContextProvider>
        <FiltersContextProvider>
          <App />
        </FiltersContextProvider>
      </ModalsContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);

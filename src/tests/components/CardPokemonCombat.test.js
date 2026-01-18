import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Para usar toBeInTheDocument y toHaveClass
import CardPokemonCombat from "../../components/CardPokemonCombat";
import { useCombatStore } from "../../stores/useCombatStore";

// Mock de la función de color para que no falle el test
jest.mock("../../utils/BackgroundColorCard", () => ({
  getBackgroundColorByType: () => "bg-red-500",
}));

describe("UI Test: CardPokemonCombat", () => {
  const pokemonMock = {
    id: 123,
    name: "Charizard",
    type: ["fire"],
    image: "charizard.png",
  };

  test('debe aplicar "opacity-30 grayscale" cuando el pokemon está derrotado', () => {
    // 1. Forzamos el estado del store: el ID 123 está en la lista de derrotados
    useCombatStore.setState({ defeatedIds: [123] });

    // 2. Renderizamos el componente
    render(<CardPokemonCombat pokemon={pokemonMock} />);

    // 3. Buscamos el div principal (el que tiene el nombre del pokemon)
    const pokemonName = screen.getByText(/Charizard/i);
    const cardContainer = pokemonName.closest("div").parentElement;

    // 4. Verificamos que tenga las clases de tu imagen
    expect(cardContainer).toHaveClass("opacity-30");
    expect(cardContainer).toHaveClass("grayscale");
  });

  test('debe tener "opacity-100" cuando el pokemon NO está derrotado', () => {
    // Aseguramos que la lista de derrotados esté vacía
    useCombatStore.setState({ defeatedIds: [] });

    render(<CardPokemonCombat pokemon={pokemonMock} />);

    const pokemonName = screen.getByText(/Charizard/i);
    const cardContainer = pokemonName.closest("div").parentElement;

    expect(cardContainer).toHaveClass("opacity-100");
    expect(cardContainer).not.toHaveClass("grayscale");
  });
});

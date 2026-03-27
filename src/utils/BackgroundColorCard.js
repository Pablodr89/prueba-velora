export function getBackgroundColorByType(type) {
  switch (type) {
    case "fire":
      return "type-fire";
    case "water":
      return "type-water";
    case "grass":
      return "type-grass";
    case "poison":
      return "type-poison";
    case "electric":
      return "type-electric";
    case "ground":
      return "type-ground";
    case "fairy":
      return "type-fairy";
    case "bug":
      return "type-bug";
    case "ghost":
      return "type-ghost";
    case "rock":
      return "type-rock";
    case "fighting":
      return "type-fighting";
    case "psychic":
      return "type-psychic";
    case "dark":
      return "type-dark";
    case "steel":
      return "type-steel";
    case "ice":
      return "type-ice";
    case "flying":
      return "type-flying";
    case "dragon":
      return "type-dragon";
    default:
      return "type-normal";
  }
}

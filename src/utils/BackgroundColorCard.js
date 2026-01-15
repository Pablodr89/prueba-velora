export function getBackgroundColorByType(type) {
  switch (type) {
    case "fire":
      return "bg-red-700";
    case "water":
      return "bg-blue-800";
    case "grass":
      return "bg-green-600";
    case "poison":
      return "bg-purple-900";
    case "electric":
      return "bg-yellow-500";
    case "ground":
      return "bg-amber-700";
    case "fairy":
      return "bg-pink-500";
    case "bug":
      return "bg-emerald-400";
    case "ghost":
      return "bg-purple-600";
    case "rock":
      return "bg-stone-500";
    case "fighting":
      return "bg-gray-600";
    case "psychic":
      return "bg-violet-400";
    case "dark":
      return "bg-gray-800";
    case "steel":
      return "bg-gray-400";
    case "ice":
      return "bg-blue-300";
    case "flying":
      return "bg-blue-500";
    case "dragon":
      return "bg-red-500";
    case "stellar":
      return "bg-teal-700";
    default:
      return "bg-orange-400";
  }
}

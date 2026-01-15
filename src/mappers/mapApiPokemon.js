export function mapApiPokemon(apiData) {
  return {
    id: apiData.id,
    name: apiData.name,
    type: apiData.types.map((t) => t.type.name),
    attack: apiData.stats.find((s) => s.stat.name === "attack").base_stat,
    defense: apiData.stats.find((s) => s.stat.name === "defense").base_stat,
    speed: apiData.stats.find((s) => s.stat.name === "speed").base_stat,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${apiData.id}.png`,
  };
}

const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemonList = async (limit, offset) => {
  const url = `${baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

export const searchPokemon = async (name) => {
  const url = `${baseUrl}/pokemon/${name}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

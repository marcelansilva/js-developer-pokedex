const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  const skills = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );
  const [skill] = skills;
  pokemon.skills = skills;
  pokemon.skill = skill;

  pokemon.exp = pokeDetail.base_experience;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  pokemon.photo = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) //promessa do body convertido em json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
};

pokeApi.searchPokemon = async (pokemon) => {
  const result = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  return await fetch(result)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .catch((error) => console.error(error));
};

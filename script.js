// Get user input element and search button
const userInputEl = document.getElementById('search-input');
const button = document.getElementById('search-button');

// Elements to update with Pokémon data
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const weightEl = document.getElementById('weight');
const heightEl = document.getElementById('height');
const spriteEl = document.getElementById('sprite');
const typesContainerEl = document.getElementById('types-container');
const hpEl = document.getElementById('hp');
const attackEl = document.getElementById('attack');
const defenseEl = document.getElementById('defense');
const specialAttackEl = document.getElementById('special-attack');
const specialDefenseEl = document.getElementById('special-defense');
const speedEl = document.getElementById('speed');

// Searches for a Pokémon in the provided data by name or ID
const searchPokemon = (pokemon, data) => {
  const searchingFor = pokemon.toLowerCase();
  // Find a Pokémon by name or ID in the data
  const foundPokemon = data.results.find(pokemonEntry => {
    const pokemonName = pokemonEntry.name;
    const pokemonId = pokemonEntry.url.split('/').filter(Boolean).pop();
    return pokemonName === searchingFor || pokemonId === searchingFor;
  });

  if (foundPokemon) {
    fetchDetailedPokemonData(foundPokemon.url);
  } else {
    // Alert the user if the Pokémon is not found
    alert('Pokémon not found');
  }
}

// Fetches Pokémon data from the API and searches for the user-specified Pokémon
const fetchPokemonData = async (inputPokemon) => {
  const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
  try {
    // Fetch the Pokémon list from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Connection error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Search for the Pokémon in the retrieved data
    searchPokemon(inputPokemon, data);
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error while fetching pokemon data: ', error);
  }
}

// Fetches detailed data about a specific Pokémon from its URL
const fetchDetailedPokemonData = async (detailedUrl) => {
  try {
    // Fetch the Pokémon info from the API
    const response = await fetch(detailedUrl);
    if (!response.ok) {
      throw new Error(`Connection error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayPokemonData(data);
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error while fetching pokemon data: ', error);
  }
}

// Updates the DOM to display detailed data about the Pokémon
const displayPokemonData = (data) => {
  nameEl.innerText = data.name.toUpperCase();
  idEl.innerText = `#${data.id}`;
  weightEl.innerText = `Weight: ${data.weight}`;
  heightEl.innerText = `Height: ${data.height}`;
  spriteEl.src = data.sprites.front_default;
  updateTypes(data);
  hpEl.innerText = data.stats[0].base_stat;
  attackEl.innerText = data.stats[1].base_stat;
  defenseEl.innerText = data.stats[2].base_stat;
  specialAttackEl.innerText = data.stats[3].base_stat;
  specialDefenseEl.innerText = data.stats[4].base_stat;
  speedEl.innerText = data.stats[5].base_stat;
}

// Updates the Pokémon's types as badges in the DOM
const updateTypes = (data) => {
  typesContainerEl.innerHTML = '';
  data.types.forEach(typeInfo => {
    const typeEl = document.createElement('span');
    typeEl.innerText = typeInfo.type.name.toUpperCase();
    typeEl.classList.add('type-badge');
    typesContainerEl.appendChild(typeEl);
  });
}

// Handles form submission, retrieves user input, and initiates the fetch process
const processFormData = (e) => {
  e.preventDefault();
  // Get the Pokémon name or ID entered by the user
  const inputPokemon = userInputEl.value;
  if (!inputPokemon) {
    alert("Please enter a Pokémon name or ID");
    return;
  }
  // Fetch Pokémon data for the given input
  fetchPokemonData(inputPokemon);
}

// Attach the processFormData function to the button's click event
button.addEventListener('click', processFormData);

// Get user input element and search button
const userInputEl = document.getElementById('search-input');
const button = document.getElementById('search-button');

// Elements to update
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const weightEl = document.getElementById('weight');
const heightEl = document.getElementById('height');
const spriteEl = document.getElementById('sprite');
const typesEl = document.getElementById('types');
const hpEl = document.getElementById('hp');
const attackEl = document.getElementById('attack');
const defenseEl = document.getElementById('defense');
const specialAttackEl = document.getElementById('special-attack');
const specialDefenseEl = document.getElementById('special-defense');
const speedEl = document.getElementById('speed');


// Searches for a Pokémon in the provided data
const searchPokemon = (pokemon, data) => {
  const searchingFor = pokemon.toLowerCase();
  // Find a Pokémon by name or ID in the data
  const foundPokemon = data.results.find(pokemonEntry => {
    const pokemonName = pokemonEntry.name;
    const pokemonId = pokemonEntry.url.split('/').filter(Boolean).pop();
    return pokemonName === searchingFor || pokemonId === searchingFor;
  });

  if (foundPokemon) {
    // Log the found Pokémon's name and URL to the console
    console.log('Found Pokémon:', foundPokemon);
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
    console.log('Error while fetching pokemon data: ', error);
  }
}



const fetchDetailedPokemonData = async (detailedUrl) => {
  try {
    // Fetch the Pokémon info from the API
    const response = await fetch(detailedUrl);
    if (!response.ok) {
      throw new Error(`Connection error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('detailed data:', data);

  } catch (error) {
    // Log any errors that occur during the fetch
    console.log('Error while fetching pokemon data: ', error);
  }
}


const displayPokemonData = () => { }







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

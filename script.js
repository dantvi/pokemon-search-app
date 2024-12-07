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

let inputPokemon = '';



const fetchPokemonList = async () => {
  const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Connection error! Status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error while fetching pokemon list: ', error);
  }
}





const processFormData = (e) => {
  e.preventDefault();
  inputPokemon = userInputEl.value;
  if (!inputPokemon) {
    alert("Please enter a Pokémon name or ID");
    return;
  }
}

button.addEventListener('click', processFormData);

// On Load
fetchPokemonList();

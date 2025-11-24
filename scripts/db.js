let pokemon = [];
let pokemonDataBase = [];
let loadDone = false;
let scrollChecking = false;
let renderedPokemon = 0;
let renderCount = 0;
let lastLoadedElements = 0;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=";
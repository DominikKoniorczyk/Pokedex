let pokemon = [];
let pokemonDataBase = [];
let loadDone = false;
let scrollChecking = false;
let lastLoadedElements = 0;
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=";
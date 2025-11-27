let pokemon = [];
let pokemonToRender = [];
let loadDone = false;
let scrollChecking = false;
let autoReload = false;
let renderedPokemon = 0;
let isLoading = false;
let langID = 8;
let langString = "en";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50000&offset=";

const TRANSLATION_TEXTS = {
    en : {
        weight: "Weight",
        species: "Species",
        height: "Height",
        abilities: "Abilities",
        search: "Search a Pokemon"
    },
    de : {
        weight: "Gewicht",
        species: "Spezies",
        height: "Größe",
        abilities: "Fähigkeiten",
        search: "Suche ein Pokemon"
    }
}

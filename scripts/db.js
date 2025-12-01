let pokemon = [];
let pokemonToRender = [];
let loadDone = false;
let scrollChecking = false;
let autoReload = false;
let renderedPokemon = 0;
let isLoading = false;
let langID = 8;
let actualSubInfo = 0;
let langString = "en";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50000&offset=";

/** Translation strings for english and german for all fixed strings on page. */
const TRANSLATION_TEXTS = {
    en : {
        weight: "Weight",
        species: "Species",
        height: "Height",
        abilities: "Abilities",
        search: "Search a Pokemon",
        back: "back",
        forward: "forward",
        main: "main",
        stats: "stats",
        evo_chain: "evo chain",
        shiny: "shiny"
    },
    de : {
        weight: "Gewicht",
        species: "Spezies",
        height: "Größe",
        abilities: "Fähigkeiten",
        search: "Suche ein Pokemon",        
        back: "zurück",
        forward: "forwärts",
        main: "Haupt",
        stats: "Stats",
        evo_chain: "Evolutionen",
        shiny: "Gläzend"
    }
}

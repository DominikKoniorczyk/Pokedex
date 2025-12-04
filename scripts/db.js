let pokemon = [];
let renderedPokemonList = [];
let pokemonToRender = [];
let loadDone = false;
let scrollChecking = false;
let autoReload = false;
let renderedPokemon = 0;
let isLoading = false;
let langID = 8;
let lastLangID = 8;
let optionsOpen = false;
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
        search: "Search a Pokemon by id or name...",
        back: "back",
        forward: "forward",
        main: "main",
        stats: "stats",
        evo_chain: "evo chain",
        shiny: "shiny",
        load_auto: "Activate automatic loading on scrolling",
        select_lang: "Language",
        german: "German",
        english: "English",
        apply: "Apply all settings",
        load_more: "Load more Pokémon",
        imprint: "Imprint"
    },
    de : {
        weight: "Gewicht",
        species: "Spezies",
        height: "Größe",
        abilities: "Fähigkeiten",
        search: "Suche ein Pokemon mit id oder name...",        
        back: "Vorheriges",
        forward: "Nächstes",
        main: "Haupt",
        stats: "Stats",
        evo_chain: "Evolutionen",
        shiny: "Gläzend",
        load_auto: "Automatisches laden beim scrollen aktivieren",
        select_lang: "Sprache",
        german: "Deutsch",
        english: "Englisch",
        apply: "Einstellungen übernehmen",
        load_more: "Mehr Pokémon laden",
        imprint: "Impressum"
    }
}

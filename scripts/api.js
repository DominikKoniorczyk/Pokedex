/** Function to fetch all pokemon from the pokemon api. */
async function getAllPokemon(){
    toggleLoadingSpinner();
    loadDone = false;
    const response = await fetch(BASE_URL + ".json");
    const responseToJson = await response.json();
    responseToJson.results.forEach(result => {        
        fetchApiData(result);
    });
}

/** Fetch additional information about a pokomen. Returning the responsed data as json. */
async function returnAdditionalInfo(responseData={}){
    const response = await fetch(responseData.species.url);
    const responseToJson = await response.json();      
    return responseToJson;
}

/** Fetch api data from database. Called from getAllPokemon on body loading. Save all fetched data to the pokemon array. 
 *  call formateApiData for each element and sort Pokemon when loading is done.
*/
async function fetchApiData(responseData){
    const mainInfoUrl = responseData.url; 
    const mainInfo = await fetch(mainInfoUrl);
    const mainInfoToJson = await mainInfo.json();    
    const additionalInformation = await returnAdditionalInfo(mainInfoToJson);    
    if(mainInfoToJson.id < 1300){
        const Data = {id: mainInfoToJson.id, name: mainInfoToJson.name.charAt(0).toUpperCase() + mainInfoToJson.name.slice(1), nameLowerCase: mainInfoToJson.name, species: mainInfoToJson.species, mainImage: mainInfoToJson.sprites.other.home.front_default, sprites: mainInfoToJson.sprites, types: [mainInfoToJson.types], weight: mainInfoToJson.weight, height: mainInfoToJson.height, stats: mainInfoToJson.stats, additionals: additionalInformation, abilities: mainInfoToJson.abilities};
        formateApiData(Data);
    } else {
        if(!loadDone){
            loadDone = true;
            sortPokemonById();
        }
   }
}

/** Formating API Data check if the incoming data is allready in the array, if not save it to the pokemon array. Avoiding duplicates. */
async function formateApiData(data={}){      
    if(pokemon.findIndex(element => element.id === data.id) === -1){  
        pokemon.push(data);
    };
}

/** Sorting Pokemon by id. */
function sortPokemonById(){
    pokemon.sort((a, b) => a.id - b.id);
    for(let i = 0; i < pokemon.length; i++)
    {
        if(i + 1 < pokemon.length){
        if(pokemon[i + 1].id === pokemon[i].id){
            pokemon.slice(i + 1, 1);
        }}
    }
    pokemonToRender = pokemon;
    end = renderedPokemon + 40;
    renderNextCards();
}

/** Fetching the evolution chain for a pokemon from the pokemon-api. Called when opening the pokemon details dialog. */
async function getEvolutionChain(id){
    const outPut = []
    const response = await fetch(pokemon[id].additionals.evolution_chain.url);
    const responseToJson = await response.json();
    const firstPokemon = pokemon.filter(poke => poke.nameLowerCase.includes(responseToJson.chain.species.name))[0];
    outPut.push(firstPokemon);
    if(responseToJson.chain.evolves_to.length > 0){
        const secondPokemon = pokemon.filter(poke => poke.nameLowerCase === (responseToJson.chain.evolves_to[0].species.name))[0];
        outPut.push(secondPokemon);
        if(responseToJson.chain.evolves_to[0].evolves_to.length > 0){
            const thirdPokemon = pokemon.filter(poke => poke.nameLowerCase === (responseToJson.chain.evolves_to[0].evolves_to[0].species.name))[0];
            outPut.push(thirdPokemon);
        }
    } 
    return outPut;    
}

/** Retrieves the description data from the Pokémon API and returns a formatted result in the selected language. */
async function getPokemonDescription(id){
    const description = await fetch(pokemon[id].species.url);
    const descriptionAsJson = await description.json();
    let foundElement = false;
    let index = 0;
    let descriptionText = ""; 
    while (!foundElement) {
        foundElement = descriptionAsJson.flavor_text_entries[index].language.name === langString;
        descriptionText = descriptionAsJson.flavor_text_entries[index].flavor_text;
        index++;
    }
    let newResult = descriptionText.replace(/\f/i, " ");
    return newResult; 
}

/** Retrieves the abilities of a Pokémon from the API and inserts the data into the description text of the Pokémon Details dialog window. */
async function getPokemonAbilities(id){
    const abilityContainerRef = document.getElementById('abilityContainer');
    abilityContainerRef.innerText = "";
    await pokemon[id].abilities.forEach(async ability => {
        const response = await fetch(ability.ability.url);
        const responseToJson = await response.json();
        let abilityName = responseToJson.names.filter(lang => lang.language.name === langString);  
        if(abilityContainerRef.innerText === ""){
            abilityContainerRef.innerText = abilityName[0].name;
        }else {
            abilityContainerRef.innerText += ", " + abilityName[0].name;
        }});        
}

/** Retrieves the heighest stat of the actual Pokémon on the details dialog. Return the heighest stat as an integer. */
function returnHeighestStat(id){
    const allStats = pokemon[id].stats
    allStats.sort((a, b) => b.base_stat - a.base_stat);
    return allStats[0];
}

/** Sorting all stats in custom order. */
function sortPokemonStats(id){
    return stats = [
        pokemon[id].stats.filter(stat => stat.stat.name == "hp")[0], 
        pokemon[id].stats.filter(stat => stat.stat.name == "attack")[0],
        pokemon[id].stats.filter(stat => stat.stat.name == "defense")[0],
        pokemon[id].stats.filter(stat => stat.stat.name == "speed")[0],
        pokemon[id].stats.filter(stat => stat.stat.name == "special-attack")[0],
        pokemon[id].stats.filter(stat => stat.stat.name == "special-defense")[0]
    ];
}

/** Retrieves stats of a Pokémon from the API. Get translation data for the stat names. */
async function getPokemonStats(id){
    const statsContainerRef = document.getElementById('statsList');
    const heighestStat = await returnHeighestStat(id);
    const stats = sortPokemonStats(id);   
    await stats.forEach(async stat => {
        const statResponse = await fetch(stat.stat.url);
        const statResponseToJson = await statResponse.json();
        const statName = statResponseToJson.names.filter(statName => statName.language.name == langString);
        statName.forEach(actual => {
            statsContainerRef.innerHTML += getStatTemplate(actual.name, stat, heighestStat);
        })       
    });
}
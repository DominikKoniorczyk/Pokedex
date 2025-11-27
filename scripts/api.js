async function getAllPokemon(){
    toggleLoadingSpinner();
    loadDone = false;
    const response = await fetch(BASE_URL + ".json");
    const responseToJson = await response.json();
    responseToJson.results.forEach(result => {        
        fetchApiData(result);
    });
}

async function returnAdditionalInfo(responseData={}){
    const response = await fetch(responseData.species.url);
    const responseToJson = await response.json();      
    return responseToJson;
}

async function fetchApiData(responseData){
    const mainInfoUrl = responseData.url; 
    const mainInfo = await fetch(mainInfoUrl);
    const mainInfoToJson = await mainInfo.json();    
    const additionalInformation = await returnAdditionalInfo(mainInfoToJson);    
    if(mainInfoToJson.id < 2000){
        const Data = {id: mainInfoToJson.id, name: mainInfoToJson.name.charAt(0).toUpperCase() + mainInfoToJson.name.slice(1), nameLowerCase: mainInfoToJson.name, species: mainInfoToJson.species, mainImage: mainInfoToJson.sprites.other.home.front_default, sprites: mainInfoToJson.sprites, types: [mainInfoToJson.types], weight: mainInfoToJson.weight, stats: mainInfoToJson.stats, additionals: additionalInformation};
        formateApiData(Data);
    } else {
        if(!loadDone){
            loadDone = true;
            sortPokemonById();
        }
   }
}

async function formateApiData(data={}){      
    if(pokemon.findIndex(element => element.id === data.id) === -1){  
        pokemon.push(data);
    };
}

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
    renderNextCards();
}

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
    return descriptionText; 
}
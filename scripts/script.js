function initWebsite(){
    addEventListener();
    getAllPokemon();
}

// #region get data from api
async function getAllPokemon(){
    loadDone = false;
    const response = await fetch(BASE_URL + ".json");
    const responseToJson = await response.json();
    responseToJson.results.forEach(result => {
        const lastElement = responseToJson.results.findLast((element) => element) == result;
        fetchApiData(result, lastElement);
    });
}

async function returnAdditionalInfo(responseData={}){
    const response = await fetch(responseData.species.url);
    const responseToJson = await response.json();      
    return responseToJson;
}

async function fetchApiData(responseData, lastElement){
    const mainInfoUrl = responseData.url; 
    const mainInfo = await fetch(mainInfoUrl);
    const mainInfoToJson = await mainInfo.json();    
    const additionalInformation = await returnAdditionalInfo(mainInfoToJson);
    const Data = {id: mainInfoToJson.id, name: mainInfoToJson.name.charAt(0).toUpperCase() + mainInfoToJson.name.slice(1), nameLowerCase: mainInfoToJson.name, mainImage: mainInfoToJson.sprites.other.home.front_default, types: [mainInfoToJson.types], weight: mainInfoToJson.weight, stats: mainInfoToJson.stats, additionals: additionalInformation};
    formateApiData(Data, lastElement);
}

async function formateApiData(data={}, lastElement=bool){      
    if(pokemon.findIndex(element => element.id === data.id) === -1){  
        pokemon.push(data);
        loadDone = lastElement;
        if(loadDone){
            sortPokemonById();
        }
    };
}

async function getEvolutionChain(id){
    const response = await fetch(pokemon[id].additionals.evolution_chain.url);
    const responseToJson = await response.json();
    const firstPokemon = pokemon.filter(poke => poke.nameLowerCase.includes(responseToJson.chain.species.name))[0];
    const secondPokemon = pokemon.filter(poke => poke.nameLowerCase.includes(responseToJson.chain.evolves_to[0].species.name))[0];
    const thirdPokemon = pokemon.filter(poke => poke.nameLowerCase.includes(responseToJson.chain.evolves_to[0].evolves_to[0].species.name))[0];
    return [firstPokemon, secondPokemon, thirdPokemon];    
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
// #endregion

function returnImagePath(pokemon){
    if(pokemon.mainImage != null){
        return pokemon.mainImage;
    } else {
        return "./assets/img/question.png";
    }
}

async function searchForPokemon(searchString){
    pokemonToRender = await pokemon.filter(pokemon => pokemon.id == parseInt(searchString) || pokemon.name.includes(searchString) || pokemon.nameLowerCase.includes(searchString));

    renderedPokemon = 0;
    const BODY_ELEMENT = document.getElementById('card_content');
    BODY_ELEMENT.innerHTML = "";
    if(searchString.length == 0){
        renderNextCards(false);
    } else{
        renderNextCards(true);
    }
}
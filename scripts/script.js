function initWebsite(){
    getNextPokemon();
}

// #region get data from api
async function getNextPokemon(){
    loadDone = false;
    const response = await fetch(BASE_URL + limitUrl + ".json");
    let responseToJson = await response.json();
    responseToJson.results.forEach(result => {
        let lastEl = responseToJson.results.findLast((element) => element) == result;
        console.log(lastEl);
        
        renderMainCard(result, lastEl);
    });
}

async function renderMainCard(responseData={}, lastElement=bool){
    const URL = responseData.url;
    const response = await fetch(URL);
    let responseToJson = await response.json();
    console.log(responseToJson.id);
    
    pokemon.push({id: responseToJson.id, name: responseToJson.name, mainImage: responseToJson.sprites.other.home.front_default, types: [responseToJson.types], weight: responseToJson.weight, stats: responseToJson.stats});
    loadDone = lastElement;
    if(loadDone){
        sortPokemonById();
    }
}

function sortPokemonById(){
    pokemon.sort((a, b) => a.id - b.id);
    pokemonDataBase = pokemonDataBase.concat(pokemon);
    pokemon = [];
    renderCardsOnPage();
}
// #endregion

// #region render cards
async function renderCardsOnPage(){
    const BODY_ELEMENT = document.getElementById('card_content'); 
    await 
    pokemonDataBase.forEach(actualPokemon => {
        BODY_ELEMENT.innerHTML += returnCardTemplate(actualPokemon);
    });
}
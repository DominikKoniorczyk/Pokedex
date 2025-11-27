function initWebsite(){
    addEventListener();
    getAllPokemon();
}

// #region get data from api
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
        const Data = {id: mainInfoToJson.id, name: mainInfoToJson.name.charAt(0).toUpperCase() + mainInfoToJson.name.slice(1), nameLowerCase: mainInfoToJson.name, mainImage: mainInfoToJson.sprites.other.home.front_default, sprites: mainInfoToJson.sprites, types: [mainInfoToJson.types], weight: mainInfoToJson.weight, stats: mainInfoToJson.stats, additionals: additionalInformation};
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
// #endregion

function returnImagePath(pokemon){
    if(pokemon.mainImage != null){
        return pokemon.mainImage;
    } else {
        return "./assets/img/question.png";
    }
}

function returnGifPath(pokemon){
    if(pokemon.sprites.other.showdown.front_default != null)
    {
        return pokemon.sprites.other.showdown.front_default;
    } else{
        return returnImagePath(pokemon);
    }
}

function returnShinyImg(pokemon){
    if(pokemon.sprites.front_shiny != null){
        return pokemon.sprites.front_shiny;
    } else {
        return "./assets/img/question.png";
    }
}

async function searchForPokemon(searchString){
    const searchResultContainer = document.getElementById('searchResultContainer');
    searchResultContainer.innerHTML = "";
    if(searchString != ""){
        pokemonToRender = await pokemon.filter(pokemon => pokemon.id == parseInt(searchString) || pokemon.name.includes(searchString) || pokemon.nameLowerCase.includes(searchString));        pokemonToRender.forEach(result => {
            searchResultContainer.innerHTML += returnResultTemplate(result);
        })
    }
}

function toggleLoadingSpinner(){    
    const loadingScreen = document.getElementById('loadingSpinner');
    loadingScreen.classList.toggle('d_none');
    if(!isLoading){
        loadingScreen.showModal();
        isLoading = true;
    } else {
        loadingScreen.close();
        isLoading = false;
    }
}

// https://pokeapi.co/api/v2/pokemon/1 > Sprites > other > showdown
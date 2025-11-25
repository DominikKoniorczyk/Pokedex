// #region init function, eventlistener on scroll and reloading function
function initWebsite(){
    addEventListener();
    getNextPokemon();
}

function checkElementIsInView(scrollYPosition)
{
    if(autoReload){
        const elementsPerRow = window.innerWidth < 1440 ? Math.floor(window.innerWidth / 236) : 6;
        const positionY = (((renderedPokemon - 25) / elementsPerRow) * 300) - window.innerHeight;

        if(positionY <= scrollYPosition){
            renderNextCards();         
        }
}
}
// #endregion

// #region get data from api
async function getNextPokemon(){
    loadDone = false;
    const response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    responseToJson.results.forEach(result => {
        let lastEl = responseToJson.results.findLast((element) => element) == result;
        renderMainCard(result, lastEl);
    });

    let test = await fetch("https://pokeapi.co/api/v2/evolution-chain/1");
    let testJSON = await test.json();
    test2.push(testJSON)
}

async function renderMainCard(responseData={}, lastElement=bool){
    const URL = responseData.url;
    const response = await fetch(URL);
    let responseToJson = await response.json();    
    if(pokemon.findIndex(element => element.id === responseToJson.id) === -1){  
        pokemon.push({id: responseToJson.id, name: responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1), nameLowerCase: responseToJson.name, mainImage: responseToJson.sprites.other.home.front_default, types: [responseToJson.types], weight: responseToJson.weight, stats: responseToJson.stats});
        loadDone = lastElement;
        if(loadDone){
            sortPokemonById();
        }};
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
    renderNextCards();
}
// #endregion

async function renderNextCards(){
    const BODY_ELEMENT = document.getElementById('card_content');
    let end = renderedPokemon + 50;
    for (let i = renderedPokemon; i < end; i++) {
        renderedPokemon++;
        let pokemonClasses = "";
        if(pokemon[i].types.length > 0){
            pokemon[i].types[0].forEach(classes => {
                pokemonClasses += returnClassImages(classes);   
            });          
        }
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemon[i], pokemonClasses, i, returnImagePath(pokemon[i]));        
    }
}

function returnImagePath(pokemon){
    if(pokemon.mainImage != null){
        return pokemon.mainImage;
    } else {
        return "./assets/img/question.png";
    }
}

// #region search functions
async function searchForPokemon(searchString){
    pokemonToRender = pokemon.filter(pokemon => pokemon.id == parseInt(searchString) || pokemon.name.includes(searchString) || pokemon.nameLowerCase.includes(searchString));

    if(searchString.length > 0){
        renderSearchPokemon();
    } else {
        renderedPokemon = 0;
        document.getElementById('card_content').innerHTML = "";
        renderNextCards();
    }
}

async function renderSearchPokemon(){
    const BODY_ELEMENT = document.getElementById('card_content');
    BODY_ELEMENT.innerHTML = "";
    for (let i = 0; i < pokemonToRender.length; i++) {
        let pokemonClasses = "";
        if(pokemonToRender[i].types.length > 0){
            pokemonToRender[i].types[0].forEach(classes => {
                pokemonClasses += returnClassImages(classes);   
            });          
        }
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemonToRender[i], pokemonClasses, i, returnImagePath(pokemonToRender[i]));        
    }
}
// #endregion

function openDialog(id){
    console.log("Klick to open: " + pokemon[id].name);
    const DIALOG_REF = document.getElementById("details");
    DIALOG_REF.innerHTML = /*html*/`
        <div class="dialog_body">
            <header class="dialog_header">
                    <h2>#${pokemon[id].id}</h2>
                    <h2 class="dialog_inner_headline">${pokemon[id].name}</h2>
            </header>
            <div class="dialog_main_img ${pokemon[id].types[0][0].type.name}">
                <img src="${returnImagePath(pokemon[id])}" alt="" srcset="">
            </div>
            <div class="dialog_classes">
                ${returnClassImages(pokemon[id].types[0][0])}
            </div>
        </div>
    `    
    DIALOG_REF.showModal();
}
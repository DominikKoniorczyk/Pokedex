// #region init function, eventlistener on scroll and reloading function
function initWebsite(){
    addEventListener();
    getNextPokemon();
}

function addEventListener(){
    document.addEventListener("scroll", (event) => {
    const SCROLL_POSITION = window.scrollY;
    if (!scrollChecking) {
        setTimeout(() => {
            checkElementIsInView(SCROLL_POSITION);
            scrollChecking = false;
            }, 20);
        scrollChecking = true;}
    }); 
}

function checkElementIsInView(scrollYPosition)
{
    let elementsPerRow = window.innerWidth < 1440 ? Math.floor(window.innerWidth / 236) : 6;
    let positionY = (((renderedPokemon - 25) / elementsPerRow) * 300) - window.innerHeight;

    if(positionY <= scrollYPosition){
        renderNextCards();         
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
}

async function renderMainCard(responseData={}, lastElement=bool){
    const URL = responseData.url;
    const response = await fetch(URL);
    let responseToJson = await response.json();    
    if(pokemon.findIndex(element => element.id === responseToJson.id) === -1){    
        pokemon.push({id: responseToJson.id, name: responseToJson.name, mainImage: responseToJson.sprites.other.home.front_default, types: [responseToJson.types], weight: responseToJson.weight, stats: responseToJson.stats});
        loadDone = lastElement;
        test.push(responseToJson);
        if(loadDone){
            sortPokemonById();
        }}
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

// #region render cards
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
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemon[i], pokemonClasses);        
    }
}

let test = []

async function Test() {
    test.forEach((response) => {
        FetchNew(response);
    })
}

async function FetchNew(urlIn){
    // const response = await fetch(urlIn);
    // let nasw = await response.json();
    // console.log(nasw);    
}
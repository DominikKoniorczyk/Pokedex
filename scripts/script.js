/** Called from body onload to init the website. Call addEventlistener and getAllPokemon. */
function initWebsite(){
    addEventListener();
    getAllPokemon();
}

/** Checks if the image path / image link is valid or not. If it is not valid returns a placeholder image, else it
 * returns the link to the pokemon image.
*/
function returnImagePath(pokemon){
    if(pokemon.mainImage != null){
        return pokemon.mainImage;
    } else {
        return "./assets/img/question.png";
    }
}

/** Return the showdown front gif of an pokemon for the dialog main image if it is valid, try to return a image by 
 * calling the returnImagePath function. 
*/
function returnGifPath(pokemon){
    if(pokemon.sprites.other.showdown.front_default != null)
    {
        return pokemon.sprites.other.showdown.front_default;
    } else{
        return returnImagePath(pokemon);
    }
}

/** Try to return the shiny image of the pokemon for the dialog. If the shiny image isn´t valid the function would 
 * return the placeholder image.
*/
function returnShinyImg(pokemon){
    if(pokemon.sprites.front_shiny != null){
        return pokemon.sprites.front_shiny;
    } else {
        return "./assets/img/question.png";
    }
}

/** Search function via input field on the main page. Checks whether the incoming searchString contains an ID or the name of a Pokémon. */
async function searchForPokemon(searchString){
    const searchResultContainer = document.getElementById('searchResultContainer');
    searchResultContainer.innerHTML = "";
    if(parseInt(searchString)){
        pokemonToRender = await pokemon.filter(pokemon => pokemon.id == parseInt(searchString)); 
    }else if(searchString.length > 3){
            pokemonToRender = await pokemon.filter(pokemon => pokemon.name.includes(searchString) || pokemon.nameLowerCase.includes(searchString) || pokemon.additionals.names[5].name.includes(searchString));        
    }
    pokemonToRender.forEach(result => {
        searchResultContainer.innerHTML += returnResultTemplate(result);
    })
}


/** Toggle the loading spinner overlay everytime we load data or render new data. */
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
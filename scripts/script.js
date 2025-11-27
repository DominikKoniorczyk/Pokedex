function initWebsite(){
    addEventListener();
    getAllPokemon();
}

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
        pokemonToRender = await pokemon.filter(pokemon => pokemon.id == parseInt(searchString) || pokemon.name.includes(searchString) || pokemon.nameLowerCase.includes(searchString));        
        pokemonToRender.forEach(result => {
            searchResultContainer.innerText += returnResultTemplate(Result);
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

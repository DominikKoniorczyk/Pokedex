function renderNextCards(search){
    const BODY_ELEMENT = document.getElementById('card_content');
    let end = search ? pokemonToRender.length : renderedPokemon + 50;
    for (let i = renderedPokemon; i < end; i++) {
        renderedPokemon++;
        let pokemonClasses = "";
        if(pokemonToRender[i].types.length > 0){
            pokemonToRender[i].types[0].forEach(classes => {
                pokemonClasses += returnClassImages(classes);});          
        }        
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemonToRender[i], pokemonClasses, i, returnImagePath(pokemonToRender[i]));        
    }
    toggleLoadingSpinner();  
}

async function openDialog(id){
    const dialogRef = document.getElementById("details");
    const evolutionChain = await getEvolutionChain(id);
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = returnPokemonInfoTemplate(id);
    renderEvolutionChain(evolutionChain);
    dialogRef.showModal();
}

async function renderEvolutionChain(evolutionChain){
    const evolutionImages = [];
    evolutionChain.forEach((evolution, i) =>{
        evolutionImages.push(evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"); 
        const chainContainer = document.getElementById('evolutionChainContainer');
        chainContainer.innerHTML += returnEvoChainContainer(evolution);
        if(i != (evolutionChain.length -1)){
            chainContainer.innerHTML += returnEvoChainArrow();
        }
    }) ;
}

async function refreshDialog(id){
    const dialogRef = document.getElementById("details");
    const evolutionChain = await getEvolutionChain(id);
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = returnPokemonInfoTemplate(id);
    renderEvolutionChain(evolutionChain);    
}

function getNextDialog(id){
    event.stopPropagation();
    if(id < 0){
        refreshDialog(pokemon.length - 1);
    } else if (id >= pokemon.length){
        refreshDialog(0);
    } else {
        refreshDialog(id);
    }
}

function closeDialog(){
    const dialogRef = document.getElementById("details");
    dialogRef.close();
    dialogRef.innerHTML ="";
    dialogRef.classList.add('d_none');
}
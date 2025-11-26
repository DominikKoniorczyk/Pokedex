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
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = returnPokemonInfoTemplate(id);

    
    const evolutionChain = await getEvolutionChain(id);
    const evolutionImages = [];

    // evolutionChain.forEach((evolution, i) =>{
    //     evolutionImages.push(evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"); 
    //     const chainContainer = document.getElementById('evolutionChainContainer');
    //     chainContainer.innerHTML +=
    //     /*html*/`
    //         <div class="dialog_evo_chain_inner">
    //             <img class="dialog_evo_chain_img" src="${evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"}" alt="" srcset="">
    //             <p>${evolution.name}</p>
    //         </div>
    //     `;
    //     if(i != (evolutionChain.length -1)){
    //         chainContainer.innerHTML += /*html*/`
    //             <img class="dialog_evo_chain_arrow" src="./assets/img/arrows.png" alt="Arrow to right">
    //         `
    //     }
    // }) ;


    dialogRef.showModal();
}

async function getNextDialog(id){
    if(id < 0){
        openDialog(pokemon.length - 1);
    } else if (id >= pokemon.length){
        openDialog(0);
    } else {
        openDialog(id);
    }
}

function closeDialog(){
    const dialogRef = document.getElementById("details");
    dialogRef.close();
    dialogRef.innerHTML ="";
    dialogRef.classList.add('d_none');
}
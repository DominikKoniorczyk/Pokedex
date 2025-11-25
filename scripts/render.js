function renderNextCards(search){
    const BODY_ELEMENT = document.getElementById('card_content');
    let end = search ? pokemonToRender.length : renderedPokemon + 50;
    for (let i = renderedPokemon; i < end; i++) {
        renderedPokemon++;
        let pokemonClasses = "";
        if(pokemonToRender[i].types.length > 0){
            pokemonToRender[i].types[0].forEach(classes => {
                pokemonClasses += returnClassImages(classes);   
            });          
        }        
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemonToRender[i], pokemonClasses, i, returnImagePath(pokemonToRender[i]));        
    }
}

function openDialog(id){
    const dialogRef = document.getElementById("details");
    const evolutionChain = getEvolutionChain(id);
    evolutionChain.forEach(chainPokemon => {
        
    })


    dialogRef.innerHTML = /*html*/`
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



    dialogRef.showModal();
}
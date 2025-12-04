/** Renders the next 40 Pokémon cards on the main page. The limit is increased by 40. */
function renderNextCards(search){
    const BODY_ELEMENT = document.getElementById('card_content');
    let end = renderedPokemon + 40;
    for (let i = renderedPokemon; i < end; i++) {
        renderedPokemon++;
        let pokemonClasses = tryChatchClassImage(i);
        renderedPokemonList.push(pokemon[i]);     
        BODY_ELEMENT.innerHTML += returnCardTemplate(pokemonToRender[i], pokemonClasses, i, returnImagePath(pokemonToRender[i]));        
    }
    toggleLoadingSpinner();  
}

function tryChatchClassImage(i){
    let pokemonClasses = "";
    if(pokemonToRender[i].types.length > 0){
        pokemonToRender[i].types[0].forEach(classes => {
            pokemonClasses += returnClassImages(classes);}); 
    }   
    return pokemonClasses;      
}

/** Opens the dialog for an pokemon depend on the incoming index. Render the dialog body and generating the needed container. */
async function openDialog(id){
    const dialogRef = document.getElementById("details");
    const evolutionChain = await getEvolutionChain(id);
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = returnPokemonInfoTemplate(id);
    renderMainPage(id);
    renderEvolutionChain(evolutionChain);
    dialogRef.showModal();
}

/** Renders the evolution chain to the evolution-chain-container on the dialog. Check if the image for the pokemon evolution
 * is valid, if not get a placeholder image.
*/
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

/** Renders all main information about the pokemon with the incoming index on the details dialog. */
async function renderMainPage(id){
    const mainRef = document.getElementById('mainContainer');
    const description = await getPokemonDescription(id);
    mainRef.innerHTML = returnDialogMainTemplate(description, id);
    getPokemonAbilities(id);
    getPokemonStats(id);
}

/** Triggered from getNextDialog when switching between Pokémon in the dialog using the previous Pokémon or next Pokémon button. 
 * This updates the dialog and displays the new Pokémon. 
*/
async function refreshDialog(id){
    const dialogRef = document.getElementById("details");
    const evolutionChain = await getEvolutionChain(id);
    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = returnPokemonInfoTemplate(id);
    renderMainPage(id);
    renderEvolutionChain(evolutionChain);    
    changeDialogInfoOnNextPokemon();
}

/** Triggered when switching between Pokémon in the dialog using the previous Pokémon or next Pokémon button. Call refreshDialog
 * and stop propagation to avoid closing the dialog.
 */
function getNextDialog(id){
    if(id < 0){
        refreshDialog(renderedPokemon - 1);
    } else if (id >= renderedPokemon){
        refreshDialog(0);
    } else {
        refreshDialog(id);
    }
}

/** Called when clicking on the page body outside of the dialog window to close the dialog. */
function closeDialog(){
    const dialogRef = document.getElementById("details");
    dialogRef.close();
    dialogRef.innerHTML ="";
    dialogRef.classList.add('d_none');
    actualSubInfo = 0;
}

function stopEventBubbling(){
    event.stopPropagation();  
}
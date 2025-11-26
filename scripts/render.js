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
    const evolutionImages = [];

    dialogRef.classList.remove('d_none');
    dialogRef.innerHTML = /*html*/`
        <div class="dialog_body">
            <header class="dialog_header">
                    <h2>#${pokemon[id].id}</h2>
                    <h2 class="dialog_inner_headline">${pokemon[id].name}</h2>
            </header>
            <main>
                <div class="dialog_main_img ${pokemon[id].types[0][0].type.name}">
                    <img src="${returnImagePath(pokemon[id])}" alt="" srcset="">
                </div>
                
                <div class="dialog_classes">
                    ${returnClassImages(pokemon[id].types[0][0])}
                </div>

                <div class="dialog_switches_container">
                    <button id="mainButton" class="dialog_switch_button dialog_switch_button_active" onclick="changeDialogInfo(${0})">main</button>
                    <button id="statsButton" class="dialog_switch_button" onclick="changeDialogInfo(${1})">stats</button>
                    <button id="evoChainButton" class="dialog_switch_button" onclick="changeDialogInfo(${2})">evo chain</button>
                    <button id="shinyButton" class="dialog_switch_button" onclick="changeDialogInfo(${3})">shiny</button>
                </div>

                <div class="infoContainer">
                    <div id="mainContainer" class="dialog_main_info "></div>
                    <div id="statsContainer" class="dialog_stats d_none"></div>
                    <div id="evolutionChainContainer" class="dialog_evo_chain d_none"></div>
                    <div id="shinyChainContainer" class="dialog_shiny_info d_none"></div>
                </div>

                <div class="dialog_switches_container dialog_footer">
                    <button class="dialog_prev_next_button bottom_left_radius">back</button>
                    <button class="dialog_prev_next_button bottom_right_radius">forward</button>
                </div>
            </main> 
        </div>
    `    

    evolutionChain.forEach((evolution, i) =>{
        evolutionImages.push(evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"); 
        const chainContainer = document.getElementById('evolutionChainContainer');
        chainContainer.innerHTML +=
        /*html*/`
            <div class="dialog_evo_chain_inner">
                <img class="dialog_evo_chain_img" src="${evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"}" alt="" srcset="">
                <p>${evolution.name}</p>
            </div>
        `;
        if(i != (evolutionChain.length -1)){
            chainContainer.innerHTML += /*html*/`
                <img class="dialog_evo_chain_arrow" src="./assets/img/arrows.png" alt="Arrow to right">
            `
        }
    }) ;


    dialogRef.showModal();
}

function closeDialog(){
    const dialogRef = document.getElementById("details");
    dialogRef.close();
    dialogRef.innerHTML ="";
    dialogRef.classList.add('d_none');
}
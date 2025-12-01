/** Add the eventlistener for auto reloading. Sets a timeout for the listener to 20 ms to prevent the function from being called continuously.  */
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

/** Function for searching for a specific Pokémon. Retrieves the value of the input field for the search and passes it on to the “searchForPokemon” function. */
function searchPokemon(){
    const INPUT_REF = document.getElementById('searchField');
    searchForPokemon(document.getElementById('searchField').value);    
}

/** Function to change the reload function of the page. Checks the value of the checkbox with the ID “autoReload” and switches between automatic and manual loading. */
function changeReloadMethod(){
    const CHECKBOX_REF = document.getElementById('autoReload');
    if(CHECKBOX_REF.checked){
        autoReload = true;
    } else{
        autoReload = false;
    } 
}

/** Triggered by the scroll event listener when automatic loading is active. 
 * Checks whether the relative end of the Pokémon list has been reached and reloads when the relative end has been reached. 
 * The offset is at 6 Pokémon before the end of the list.
*/
function checkElementIsInView(scrollYPosition)
{
    if(autoReload){
        const elementsPerRow = window.innerWidth < 1440 ? Math.floor(window.innerWidth / 236) : 6;
        const positionY = (((renderedPokemon - 6) / elementsPerRow) * 300) - window.innerHeight;

        if(positionY <= scrollYPosition){
            toggleLoadingSpinner();  
            renderNextCards();       
        }
    }
}

/** Changes the information displayed in the dialog box when you click on one of the information buttons in the dialog box. 
 * Then executes the appropriate function to render or fetch the corresponding data.
*/
function changeDialogInfo(id){
    event.stopPropagation();    
    actualSubInfo = id;
    switch(id){
        case 0: 
            setMainActive();
            break;
        case 1: 
            setStatsActive();
            break;
        case 2:
            setEvoActive();
            break;
        case 3: 
            setShinyActive();
            break;
    }
}

function changeDialogInfoOnNextPokemon(){
    switch(actualSubInfo){
        case 0: 
            setMainActive();
            break;
        case 1: 
            setStatsActive();
            break;
        case 2:
            setEvoActive();
            break;
        case 3: 
            setShinyActive();
            break;
    }
}

/** Set main info as activ. Add activ-button class to the main-button and switches d_none all container. Removes activ-button class
 * on all other buttons.
 */
function setMainActive(){
    document.getElementById('mainButton').classList.add("dialog_switch_button_active");
    document.getElementById('statsButton').classList.remove('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.remove('dialog_switch_button_active');
    document.getElementById('shinyButton').classList.remove('dialog_switch_button_active');
    document.getElementById('mainContainer').classList.remove("d_none");
    document.getElementById('statsContainer').classList.add("d_none");
    document.getElementById('evolutionChainContainer').classList.add("d_none");
    document.getElementById('shinyChainContainer').classList.add("d_none");
}

/** Set stats as activ. Add activ-button class to the stats-button and switches d_none all container. Removes activ-button class
 * on all other buttons.
 */
function setStatsActive(){
    document.getElementById('mainButton').classList.remove("dialog_switch_button_active");
    document.getElementById('statsButton').classList.add('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.remove('dialog_switch_button_active');
    document.getElementById('shinyButton').classList.remove('dialog_switch_button_active');
    document.getElementById('mainContainer').classList.add("d_none");
    document.getElementById('statsContainer').classList.remove("d_none");
    document.getElementById('evolutionChainContainer').classList.add("d_none");
    document.getElementById('shinyChainContainer').classList.add("d_none");
}

/** Set evo-chain as activ. Add activ-button class to the evo-chain-button and switches d_none all container. Removes activ-button class
 * on all other buttons.
 */
function setEvoActive(){
    document.getElementById('mainButton').classList.remove("dialog_switch_button_active");
    document.getElementById('statsButton').classList.remove('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.add('dialog_switch_button_active');
    document.getElementById('shinyButton').classList.remove('dialog_switch_button_active');
    document.getElementById('mainContainer').classList.add("d_none");
    document.getElementById('statsContainer').classList.add("d_none");
    document.getElementById('evolutionChainContainer').classList.remove("d_none");
    document.getElementById('shinyChainContainer').classList.add("d_none");
}

/** Set shiny as activ. Add activ-button class to the shiny-button and switches d_none all container. Removes activ-button class
 * on all other buttons.
 */
function setShinyActive(){
    document.getElementById('mainButton').classList.remove("dialog_switch_button_active");
    document.getElementById('statsButton').classList.remove('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.remove('dialog_switch_button_active');
    document.getElementById('shinyButton').classList.add('dialog_switch_button_active');
    document.getElementById('mainContainer').classList.add("d_none");
    document.getElementById('statsContainer').classList.add("d_none");
    document.getElementById('evolutionChainContainer').classList.add("d_none");
    document.getElementById('shinyChainContainer').classList.remove("d_none");
}
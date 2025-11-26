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

function searchPokemon(){
    const INPUT_REF = document.getElementById('searchField');
    
    searchForPokemon(document.getElementById('searchField').value);    
}

function changeReloadMethod(){
    const CHECKBOX_REF = document.getElementById('autoReload');
    if(CHECKBOX_REF.checked){
        autoReload = true;
    } else{
        autoReload = false;
    } 
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

function changeDialogInfo(id){
    event.stopPropagation();
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
    }
}

function setMainActive(){
    document.getElementById('mainButton').classList.add("dialog_switch_button_active");
    document.getElementById('statsButton').classList.remove('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.remove('dialog_switch_button_active');

    document.getElementById('mainContainer').classList.remove("d_none");
    document.getElementById('statsContainer').classList.add("d_none");
    document.getElementById('evolutionChainContainer').classList.add("d_none");
}

function setStatsActive(){
    document.getElementById('mainButton').classList.remove("dialog_switch_button_active");
    document.getElementById('statsButton').classList.add('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.remove('dialog_switch_button_active');

    document.getElementById('mainContainer').classList.add("d_none");
    document.getElementById('statsContainer').classList.remove("d_none");
    document.getElementById('evolutionChainContainer').classList.add("d_none");
}

function setEvoActive(){
    document.getElementById('mainButton').classList.remove("dialog_switch_button_active");
    document.getElementById('statsButton').classList.remove('dialog_switch_button_active');
    document.getElementById('evoChainButton').classList.add('dialog_switch_button_active');

    document.getElementById('mainContainer').classList.add("d_none");
    document.getElementById('statsContainer').classList.add("d_none");
    document.getElementById('evolutionChainContainer').classList.remove("d_none");
}
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
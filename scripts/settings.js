/** Open the settings menu under the settings button. */
function openSettingsMenu(){
    
}

/** Change language of the whole site via options. */
function changeLanguage(languageID){
    const searchFieldRef = document.getElementById('searchField');
    const mainContainer = document.getElementById('card_content');
    mainContainer.innerHTML = "";
    langID = languageID;
    langString = langID == 8 ? "en" : "de";
    renderedPokemon = 0;
    toggleLoadingSpinner();
    renderNextCards()
    searchFieldRef.setAttribute('placeholder', TRANSLATION_TEXTS[langString].search); 
}
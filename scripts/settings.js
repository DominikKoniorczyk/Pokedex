/** Open the settings menu under the settings button. */
function openSettingsMenu(){
    event.stopPropagation();
    optionsOpen = true;
    const settingsContainer = document.getElementById('searchResultContainer');
    settingsContainer.innerHTML = getSettingsMenuTemplate();
}

/** Close the settings menu under the settings button and search bar. */
function closeSettingsMenu(){
    optionsOpen = false;
    const settingsContainer = document.getElementById('searchResultContainer');
    settingsContainer.innerHTML = "";
}

/** Called on change language settings by selector in the options menu. */
function selectNewLanguage(){
    const selectorRef = document.getElementById('languageSelector');
    if(selectorRef.value === "de"){
        langID = 5;
    } else {
        langID = 8;
    }
    langString = selectorRef.value; 
}

/** Applying all settings on click on the apply settings button. */
function applySettings(){
    if(lastLangID !== langID){
        changeLanguage(langID);
        lastLangID = langID;
    }
    closeSettingsMenu();
}

/** Change language of the whole site via options. */
function changeLanguage(languageID){
    const searchFieldRef = document.getElementById('searchField');
    const mainContainer = document.getElementById('card_content');
    document.getElementById('loadMoreButton').innerText = TRANSLATION_TEXTS[langString].load_more;
    document.getElementById('imprintLink').innerText = TRANSLATION_TEXTS[langString].imprint;
    mainContainer.innerHTML = "";
    langString = langID == 8 ? "en" : "de";
    renderedPokemon = 0;
    toggleLoadingSpinner();
    renderNextCards()
    searchFieldRef.setAttribute('placeholder', TRANSLATION_TEXTS[langString].search); 
}
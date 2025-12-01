/** Returning the main card html template for the small cards on the main page. */
function returnCardTemplate(pokemonData={}, classes, id, imgPath) {
    return /*html*/`
        <article class = "card" onclick="openDialog(${pokemonData.id - 1})">
            <div class = "card_inner">
                <div class = "card_headline">
                    <h2 class = "inner_headline">#${pokemonData.id}</h2>
                    <h2 class = "inner_headline">${pokemonData.additionals.names[langID].name}</h2>
                </div>
                <div class="pokemon_img_container ${pokemonData.types[0][0].type.name}">
                    <img src=${imgPath} alt="" srcset="">
                </div>
                <div class="pokemon_type_container">
                    ${classes}
                </div>
            </div>
        </article>
    `;
}

/** Returning the class images html for the small and big cards. */
function returnClassImages(data){
    return /*html*/`
        <button class = "class_icon ${data.type.name}">
            <div class ="${data.type.name}_image type_img" src="" alt=""> 
                <span class="tooltiptext">${data.type.name}</span>
            </div>
        </button>
    `;
}

/** Returning the html template for the info dialog by clicking on a small card. */
function returnPokemonInfoTemplate(id){
    return /*html*/`
        <div class="dialog_body">
            <header class="dialog_header">
                    <h2>#${pokemon[id].id}</h2>
                    <h2 class="dialog_inner_headline">${pokemon[id].additionals.names[langID].name}</h2>
            </header>
            <main>
                <div class="dialog_main_img ${pokemon[id].types[0][0].type.name}">
                    <img src="${returnGifPath(pokemon[id])}" alt="" srcset="">
                </div>
                
                <div class="dialog_classes">
                    ${returnClassImages(pokemon[id].types[0][0])}
                </div>

                <div class="dialog_switches_container">
                    <button id="mainButton" class="dialog_switch_button dialog_switch_button_active" onclick="changeDialogInfo(${0})">${TRANSLATION_TEXTS[langString].main}</button>
                    <button id="statsButton" class="dialog_switch_button" onclick="changeDialogInfo(${1})">${TRANSLATION_TEXTS[langString].stats}</button>
                    <button id="evoChainButton" class="dialog_switch_button" onclick="changeDialogInfo(${2})">${TRANSLATION_TEXTS[langString].evo_chain}</button>
                    <button id="shinyButton" class="dialog_switch_button" onclick="changeDialogInfo(${3})">${TRANSLATION_TEXTS[langString].shiny}</button>
                </div>

                <div class="infoContainer">
                    <div id="mainContainer" class="dialog_main_info "></div>
                    <div id="statsContainer" class="dialog_stats d_none"><table id="statsList" class="stat_table"></table></div>
                    <div id="evolutionChainContainer" class="dialog_evo_chain d_none"></div>
                    <div id="shinyChainContainer" class="dialog_shiny_info d_none"><img class="shiny_img" src="${returnShinyImg(pokemon[id])}" alt=""></div>
                </div>

                <div class="dialog_switches_container dialog_footer">
                    <button class="dialog_prev_next_button bottom_left_radius" onclick="getNextDialog(${id - 1})">${TRANSLATION_TEXTS[langString].back}</button>
                    <button class="dialog_prev_next_button bottom_right_radius"  onclick="getNextDialog(${id + 1})">${TRANSLATION_TEXTS[langString].forward}</button>
                </div>
            </main> 
        </div>
    `;
}

/** Returns a html template for the evolution chain on the dialog body. */
function returnEvoChainContainer(evolution){
    return /*html*/`
        <div class="dialog_evo_chain_inner">
                <img class="dialog_evo_chain_img" src="${evolution.mainImage != null ? evolution.mainImage : "./assets/img/question.png"}" alt="" srcset="">
                <p>${evolution.name}</p>
            </div>
    `
}

/** Returns the html template for the evochain arrow image. */
function returnEvoChainArrow(){
    return /*html*/`
        <img class="dialog_evo_chain_arrow" src="./assets/img/arrows.png" alt="Arrow to right">
    `;
}

/** Returns the html template for the dialog main page. Insert texts for description, species, weight and height. Generate
 * p-tag for the abilities.
 */
function returnDialogMainTemplate(description, id){
    return /*html*/`
        <p class="dialog_description">${description}</p>
        <div class="dialog_list"><p>${TRANSLATION_TEXTS[langString].species}: </p><p>${pokemon[id].additionals.names[langID].name}</p></div>
        <div class="dialog_list"><p>${TRANSLATION_TEXTS[langString].weight}: </p><p>${pokemon[id].weight} kg</p></div>
        <div class="dialog_list"><p>${TRANSLATION_TEXTS[langString].height}: </p><p>${pokemon[id].height * 10} cm</p></div>
        <div class="dialog_list"><p>${TRANSLATION_TEXTS[langString].abilities}: </p><p id="abilityContainer" ></p></div>
    `
}

/** Returns a result button for the search results. Insert name and id of the pokemon on the result button. */
function returnResultTemplate(result){
    return /*html*/`
        <button class="result_button"onclick="openDialog(${(result.id - 1)})"> <p>#${result.id}</p> <p>${result.additionals.names[langID].name}</p></button>
    `
}

/** Returns a html stat template for the dialog tab "stats". */
function getStatTemplate(statname, stat, heighestStat){
    return /*html*/`
    <tr class="stat_item">
        <td class="stat_name">${statname}</td>
        <td class="stat_progress"><div class="stat_progress_bar  ${stat.stat.name}" style="width: ${(parseInt(stat.base_stat)/parseInt(heighestStat.base_stat)) *  100}%"></div></td>
        <td class="text_align_end">${parseInt(stat.base_stat)}</td>
    </tr>
    `
}

/** Returns settings html template for the options menu. */
function getSettingsMenuTemplate(){
    return /*html*/`
        <div class="settings_menu">
            <div class="setting_option_container">
                <p>${TRANSLATION_TEXTS[langString].load_auto}</p>
                <input class="checkbox" type="checkbox" ${autoReload ? checked="checked" : ""} name="Auto Reload" id="autoReload" onchange="changeReloadMethod()">
            </div>   
            <div class="setting_option_container">
                <p>${TRANSLATION_TEXTS[langString].select_lang}</p>
                <select name="language_selector" id="languageSelector" value="${langString}"onchange="selectNewLanguage()">
                    <option value="en" ${langID == 8 ? selected="selected" : ""}>${TRANSLATION_TEXTS[langString].english}</option>
                    <option value="de" ${langID == 5 ? selected="selected" : ""}>${TRANSLATION_TEXTS[langString].german}</option>
                </select>
            </div> 
            <button onclick="applySettings()">${TRANSLATION_TEXTS[langString].apply}</button>  
        </div>
    `
}
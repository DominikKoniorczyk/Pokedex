function returnCardTemplate(pokemonData={}, classes, id, imgPath) {
    return /*html*/`
        <article class = "card" onclick="openDialog(${pokemonData.id - 1})">
            <div class = "card_inner">
                <div class = "card_headline">
                    <h2 class = "inner_headline">#${pokemonData.id}</h2>
                    <h2 class = "inner_headline">${pokemonData.name}</h2>
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

function returnClassImages(data){
    return /*html*/`
        <button class = "class_icon ${data.type.name}">
            <div class ="${data.type.name}_image type_img" src="" alt=""> 
                <span class="tooltiptext">${data.type.name}</span>
            </div>
        </button>
    `;
}
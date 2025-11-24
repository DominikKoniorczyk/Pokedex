function returnCardTemplate(pokemonData={}, classes) {
    return /*html*/`
        <article class = "card">
            <div class = "card_inner">
                <div class = "card_headline">
                    <h2 class = "inner_headline">#${pokemonData.id}</h2>
                    <h2 class = "inner_headline">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                </div>
                <div class="pokemon_img_container ${pokemonData.types[0][0].type.name}">
                    <img src=${pokemonData.mainImage} alt="" srcset="">
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
            <div class ="${data.type.name}_imgage" src="" alt="">
        </button>
    `;
}
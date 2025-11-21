function returnCardTemplate(pokemonData={}, ) {
    return /*html*/`
        <article class = "card">
            <div class = "card_inner">
                <div class="card_headline">
                    <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                </div>
                <div class="pokemon_img_container ${pokemonData.types[0][0].type.name}">
                    <img src=${pokemonData.mainImage} alt="" srcset="">
                </div>
                <div class="pokemon_type_container">
                    <button class="test"></button>
                </div>
            </div>
        </article>
    `;
}
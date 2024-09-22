$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('pokemon');

    if (pokemonId) {
        fetch("./pokedex.json")
            .then(response => response.json())
            .then(pokemonData => {
                const pokemon = pokemonData.find(p => p.id === parseInt(pokemonId));
                if (pokemon) {
                    displayPokemonDetails(pokemon);
                } else {
                    $("#details-container").html("<p>Pokémon not found!</p>");
                }
            })
            .catch(error => {
                $("#details-container").html("<p>Error fetching data. Please try again later.</p>");
            });
    } else {
        $("#details-container").html("<p>No Pokémon selected.</p>");
    }
});

function displayPokemonDetails(pokemon) {
    const detailsContainer = $("#details-container");
    detailsContainer.html(`
        <img src="${pokemon.image.hires}" alt="${pokemon.name.english}">
        <h2>${pokemon.name.english}</h2>
        <p><b>Number:</b> #${pokemon.id}</p>
        <p><b>Type:</b> ${pokemon.type.join(", ")}</p>
        <p><b>Species:</b> ${pokemon.species}</p>
        <p><b>Description:</b> ${pokemon.description}</p>
        
        <p><b>Base Stats:</b></p>
        <ul>
            <li>HP: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base.HP / 2.55}%"></div></div></li>
            <li>Attack: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base.Attack / 2.55}%"></div></div></li>
            <li>Defense: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base.Defense / 2.55}%"></div></div></li>
            <li>Sp. Attack: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base["Sp. Attack"] / 2.55}%"></div></div></li>
            <li>Sp. Defense: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base["Sp. Defense"] / 2.55}%"></div></div></li>
            <li>Speed: <div class="stat-bar"><div class="stat-value" style="width: ${pokemon.base.Speed / 2.55}%"></div></div></li>
        </ul>
        
        <div class="profile-info">
            <p><b>Profile:</b></p>
            <ul>
                <li><b>Height:</b> ${pokemon.profile.height}</li>
                <li><b>Weight:</b> ${pokemon.profile.weight}</li>
                <li><b>Egg Groups:</b> ${pokemon.profile.egg.join(", ")}</li>
                <li><b>Ability:</b> ${pokemon.profile.ability[0][0]} (${pokemon.profile.ability[0][1] === "true" ? 'Hidden' : 'Normal'})</li>
                <li><b>Gender Ratio:</b> ${pokemon.profile.gender}</li>
            </ul>
        </div>
    `);
}

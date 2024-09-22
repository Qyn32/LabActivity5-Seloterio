document.addEventListener("DOMContentLoaded", () => {
    fetch('./pokedex.json') // Adjust the path if necessary
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(pokemonData => {
        console.log(pokemonData); // Log to check if data is fetched correctly

        const container = document.querySelector(".container");

        pokemonData.forEach(pokemon => {
            console.log(pokemon); // Log each Pokémon object

            const card = `
            <div class="pokemon-card">
                <img src="${pokemon.image_sprite}" alt="${pokemon.name.english}" />
                <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
                <p class="pokemon-name">${pokemon.name.english}</p>
                <p class="pokemon-type">
                    ${pokemon.type.map(type => <span class="type ${type.toLowerCase()}">${type}</span>).join(' ')}
                </p>
            </div>
            `;

            container.innerHTML += card;
        });
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
    });
});
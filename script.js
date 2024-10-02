document.addEventListener("DOMContentLoaded", () => {
    fetch('./pokedex.json') // Adjust the path if necessary
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(pokemonData => {
        const container = document.querySelector(".container");

        pokemonData.forEach((pokemon, i) => {

            if(i > 898) return // I-remove lang ni, gibutang ra koni para di mo laod tanan, para paspas

            const card = `
            <a href="pokemon-stats.html?pokemon=${pokemon.id}"
                <div class="pokemon-card">
                    <img src="${pokemon.image.thumbnail}" alt="${pokemon.name.english}" />
                    <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
                    <p class="pokemon-name">${pokemon.name.english}</p>
                    <p class="pokemon-type">
                        ${pokemon.type.map(type => `<span class="type ${type.toLowerCase()}">${type}</span>`).join(' ')}
                    </p>
                </div> 
            </a>
            `;

            container.innerHTML += card;
        });
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
    });
});

// Prepare a variable to store Pokémon data
let pokedex = [];

// Wait for the webpage to load and execute the main program
window.addEventListener('load', async function() {
    // Load the Pokémon data
    pokedex = await loadPokemon();
});

// New functions go here

/**
 * Load all the data on all Pokémon available in ./js/pokemon.json.
 * @returns An array of Pokémon data available.
 */
async function loadPokemon() {
    return await fetch('./js/pokemon.json')
    .then(response => response.json());
}
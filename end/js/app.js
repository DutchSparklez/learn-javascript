// Prepare a variable to store Pokémon data
let pokedex = [];
let selectedPokemon = '000';

// Wait for the webpage to load and execute the main program
window.addEventListener('load', async function() {
    // Load the Pokémon data
    pokedex = await loadPokemon();

    // Fill the list with all Pokémon
    generatePokémonList(pokedex);

    // Assign the search function
    document.getElementById('search').oninput = search;
});

/**
 * This function filters the Pokémon list based on the input of the user inside the search box.
 *
 * @param {*} event The event that triggered the function.
 */
function search(event) {
    // Get the current search term
    const term = event.target.value.toLowerCase();

    // Filter the Pokémon based on the term
    const filteredPokemon = pokedex.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(term) || pokemon.number.includes(term)
    });

    // Generate the new Pokémon list
    generatePokémonList(filteredPokemon)
}

/**
 * Generate a list of Pokémon for the user to choose from.
 * @param {[{name, number, description, category, imageurl, length, weight, abilities, typing}]} pokemon The pokémon to put in the list.
 */
function generatePokémonList(pokemon) {
    // Select the list from the HTML DOM
    const pokemonList = document.getElementById('pokemon');

    // Clear the content of the list
    pokemonList.innerHTML = '';

    // Loop over all the Pokémon
    pokemon.forEach(function(singlePokemon) {
        // Add a list item to the list
        document.getElementById('pokemon').appendChild(generateListItem(singlePokemon));
    });
}

/**
 * Create a single list item.
 *
 * @param {{name, number, description, category, imageurl, length, weight, abilities, typing}} pokemon the pokemon to create a list item for.
 */
function generateListItem(pokemon) {
    // Create the list item
    const listitem = document.createElement('li');

    // Set the attributes
    listitem.innerHTML = getPokemonNumberAndName(pokemon)
    listitem.className = 'list-group-item list-group-item-action clickable';

    // Check whether this Pokémon is selected
    if (pokemon.number === selectedPokemon) {
        // Add the active class
        listitem.className += ' active';
    }

    // Assign the on-click function
    listitem.onclick = selectPokemonFromList;

    // Return the list item
    return listitem;
}

/**
 * Event: When clicked on a single Pokémon, this function loads the data of that Pokémon.
 *
 * @param {*} event The event that triggered the function.
 */
function selectPokemonFromList(event) {
    // Get the Pokémon number & save it
    const number = event.target.innerHTML.split(' ')[0];
    selectedPokemon = number;

    // Check there is an active field
    if (document.querySelector('.active')) {
        // Remove the active class from that field
        document.querySelector('.active').classList.remove('active');
    }
    
    // Add the active field to the list item that was clicked
    event.target.className += ' active';

    // Display the data for the current Pokémon
    DisplayPokémonData(pokedex.find(pokemon => pokemon.number === number));
}

/**
 * Display the data of a single Pokémon object.
 *
 * @param {{name, number, description, category, imageurl, length, weight, abilities, typing}} pokemon the pokemon object to display.
 */
function DisplayPokémonData(pokemon) {
    // Display all the data on the DOM of the provided Pokémon
    document.getElementById('name-and-number').innerHTML = getPokemonNumberAndName(pokemon);
    document.getElementById('description').innerHTML = pokemon.description;
    document.querySelector('img').src = pokemon.imageurl;
}

/**
 * Get the number and the name of a single Pokémon in the following format:
 * '{number} {name}'.
 *
 * @param {{name, number, description, category, imageurl, length, weight, abilities, typing}} pokemon the pokemon to get the data from.
 * @returns The formatted string.
 */
function getPokemonNumberAndName(pokemon) {
    return `${pokemon.number} ${pokemon.name}`;
}

/**
 * Load all the data on all Pokémon available in ./js/pokemon.json.
 * @returns {Promise<[{name, number, description, category, imageurl, length, weight, abilities, typing}]>} An array of Pokémon data available.
 */
async function loadPokemon() {
    return await fetch('./js/pokemon.json')
    .then(response => response.json());
}
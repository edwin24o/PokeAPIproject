// Get DOM elements make it a POKEDEX LIKE  UI
const redButton = document.getElementById('red-button');
const blueButton = document.getElementById('blue-button');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonSearch = document.getElementById('pokemon-search');
const topScreen = document.getElementById('top-screen');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

const POKEAPI = 'https://pokeapi.co/api/v2/'; // API URL
let currentPokemonId = 1;


// Fetch Pokémon data from the PokeAPI using async/await
async function fetchPokemonData(nameOrId) {
    try {
        const response = await fetch(`${POKEAPI}pokemon/${nameOrId}`); // Use POKEAPI constant
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const data = await response.json(); // Await the response
        displayPokemonData(data); // Display the Pokémon data
        currentPokemonId = data.id; 
    } catch (error) {
        pokemonInfo.textContent = "Pokémon not found! Try again.";
        console.error('Error fetching Pokémon data:', error);
    }
}

// Clear the screens existing Pokémon data, show the search bar and display message below..
redButton.addEventListener('click', () => {
    pokemonImage.src = '';
    pokemonInfo.textContent = 'Pokedex AI here, who are you searching for ......';
    
    // Hide the Pokémon image and show the search bar
    pokemonImage.style.display = 'none';
    pokemonSearch.style.display = 'block';
});

// Submit search when blue button is clicked
blueButton.addEventListener('click', async () => {
    const nameOrId = pokemonSearch.value.toLowerCase(); // Get the search input
    if (nameOrId) {
        await fetchPokemonData(nameOrId); // Fetch Pokémon data based on the name or ID
    }
});

// Display Pokémon on the top screen
function displayPokemonData(pokemon) {
    pokemonImage.style.display = 'block';
    pokemonImage.src = pokemon.sprites.front_default; 
    pokemonSearch.style.display = 'none';
    
    // Show the Pokémon info on the bottom screen
    pokemonInfo.innerHTML = `
        <strong>ID: ${pokemon.id}</strong><br>
        <strong>${capitalizeFirstLetter(pokemon.name)}</strong><br>
        <strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}<br>
        <strong>Height:</strong> ${pokemon.height}<br>
        <strong>Weight:</strong> ${pokemon.weight}<br>
        <strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}
    `;
}

// Next button functionality
nextButton.addEventListener('click', async () => {
    currentPokemonId++;
    await fetchPokemonData(currentPokemonId);
});

// Previous button functionality
prevButton.addEventListener('click', async () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        await fetchPokemonData(currentPokemonId);
    }
});

// Initial load with 'pikachu'
window.addEventListener('DOMContentLoaded', async () => {
    await fetchPokemonData('bulbasaur'); 
});

// Capitalize first letter function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const pokemonSelector = document.getElementById('pokemonSelector');
const searchBtn = document.getElementById('searchBtn');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonStats = document.getElementById('pokemonStats');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPokemonId = 1; 

async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function displayPokemonInfo(data) {
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;

    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    pokemonTypes.innerHTML = `<strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}`;

    pokemonStats.innerHTML = `<strong>Stats:</strong> <br>${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>')}`;
}

searchBtn.addEventListener('click', () => {
    const pokemonId = parseInt(pokemonSelector.value, 10);
    if (pokemonId && pokemonId >= 1 && pokemonId <= 898) {
        currentPokemonId = pokemonId;
        fetchPokemonData(currentPokemonId);
    } else {
        alert('Please enter a valid Pokémon ID (1-898).');
    }
});


prevBtn.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemonData(currentPokemonId);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPokemonId < 898) {
        currentPokemonId++;
        fetchPokemonData(currentPokemonId);
    }
});

fetchPokemonData(currentPokemonId);

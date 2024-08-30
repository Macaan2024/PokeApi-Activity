const pokemonCount = 60;
var pokedex = {}; // {1 : {"name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    let pokemonList = document.getElementById("pokemon-list");

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
       
        let pokemonContainer = document.createElement("div");
        pokemonContainer.classList.add("bg-orange", "flex", "flex-col", "justify-center", "items-center");

        let cardImage = document.createElement("img");
        cardImage.src = pokedex[i]["img"];
        cardImage.alt = pokedex[i]["name"];

        let cardName = document.createElement("h6");
        cardName.innerText = pokedex[i]["name"].toUpperCase();

        // Pass the Pokémon ID to the update function
        pokemonContainer.addEventListener("click", () => updatePokemon(i));

        pokemonContainer.appendChild(cardImage);
        pokemonContainer.appendChild(cardName);

        pokemonList.appendChild(pokemonContainer);
    }

    // Display the first Pokémon by default
    updatePokemon(1);
}

async function getPokemon(num) {
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`;

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonHp = pokemon["stats"][0]["base_stat"];
    let pokemonAttack = pokemon["stats"][1]["base_stat"];
    let pokemonDefense = pokemon["stats"][2]["base_stat"];
    let pokemonSpecialAttack = pokemon["stats"][3]["base_stat"];
    let pokemonSpecialDefense = pokemon["stats"][4]["base_stat"];
    let pokemonSpeed = pokemon["stats"][5]["base_stat"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {
        "name": pokemonName,
        "img": pokemonImg,
        "types": pokemonType,
        "desc": pokemonDesc,
        "hp": pokemonHp,
        "attack": pokemonAttack,
        "defense": pokemonDefense,
        "special-attack": pokemonSpecialAttack,
        "special-defense": pokemonSpecialDefense,
        "speed": pokemonSpeed
    };
}

function updatePokemon(pokemonId) {
    document.getElementById("cards-pokemon-img").src = pokedex[pokemonId]["img"];

    document.getElementById("card-pokemon-name").innerHTML = "<h6>" + pokedex[pokemonId]["name"].toUpperCase() + "</h6>";
    document.getElementById("card-pokemon-description").innerText = pokedex[pokemonId]["desc"];

    document.getElementById("pokemonHP").innerText = pokedex[pokemonId]["hp"];
    document.getElementById("pokemonAttack").innerText = pokedex[pokemonId]["attack"];
    document.getElementById("pokemonDefense").innerText = pokedex[pokemonId]["defense"];
    document.getElementById("pokemonSpecialAttack").innerText = pokedex[pokemonId]["special-attack"];
    document.getElementById("pokemonSpecialDefense").innerText = pokedex[pokemonId]["special-defense"];
    document.getElementById("pokemonSpeed").innerText = pokedex[pokemonId]["speed"];

    // Update stat bars
    const maxStats = {
        hp: 255,
        attack: 180,
        defense: 230,
        specialAttack: 180,
        specialDefense: 230,
        speed: 180
    };

    document.getElementById("hp-bar").style.width = `${(pokedex[pokemonId]["hp"] / maxStats.hp) * 100}%`;
    document.getElementById("attack-bar").style.width = `${(pokedex[pokemonId]["attack"] / maxStats.attack) * 100}%`;
    document.getElementById("defense-bar").style.width = `${(pokedex[pokemonId]["defense"] / maxStats.defense) * 100}%`;
    document.getElementById("special-attack-bar").style.width = `${(pokedex[pokemonId]["special-attack"] / maxStats.specialAttack) * 100}%`;
    document.getElementById("special-defense-bar").style.width = `${(pokedex[pokemonId]["special-defense"] / maxStats.specialDefense) * 100}%`;
    document.getElementById("speed-bar").style.width = `${(pokedex[pokemonId]["speed"] / maxStats.speed) * 100}%`;

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}

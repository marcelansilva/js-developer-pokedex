const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonitens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          ` 
          <div id="${pokemon.number}" class="modal " >
          <div class="modal-content ${pokemon.types[0]}">
            <span class="close" onClick="modalHandler(${
              pokemon.number
            })" >&times;</span>
             
          <li class="pokemon ${pokemon.types[0]}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <span class="exp">Experience: ${pokemon.exp} XP</span>
        <span class="height">Height: ${pokemon.height} "</span>
        <span class="weight">Weight: ${pokemon.weight} Kg</span>

        <div class="details">
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ol>
        <ol class="skills"> Skills: 
        ${pokemon.skills.map((skill) => `<li>${skill}</li>`).join("")}
        </ol>
          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>
      </li>
          </div>
        
        </div> 
          
          <li class="pokemon ${pokemon.types[0]}" onClick="modalHandler(${
            pokemon.number
          })" >
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="details">
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ol>
          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>
      </li>`
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonitens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonitens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonitens(offset, limit);
  }
});

function modalHandler(number) {
  const modal = document.getElementById(number);
  const actualStyle = modal.style.display;
  if (actualStyle == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

function searchPokemon() {
  const myInput = document.getElementById("search-input").value.toLowerCase();
  if (myInput != "") {
    pokeApi.searchPokemon(myInput).then((pokemon) => {
      const newHmtl = `   <li class="pokemon ${pokemon.types[0]}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
            <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
            </ol>
              <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
          </li>`;
      pokemonList.innerHTML = newHmtl;
    });
  } else {
    pokemonList.innerHTML = "";
    loadPokemonitens(offset, limit);
  }
}

//IIFE wrap
let pokemonRepository = (function() {
  let pokemonList = [];
  let modalContainer = document.querySelector('#exampleModal');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Add pokemon
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }

    //Get all Pokemon
  }
  function getAll() {
    return pokemonList;
  }

  //Load pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon), console.log(pokemon);
    });
  }
  //Make a modal for each listed pokemon
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    let heightElement = $('<p>' + 'Heigth: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let imageElement = $('<img class="modal-img" style="width:30%">');
    imageElement.attr('src', pokemon.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(imageElement);

    $('#exampleModal').modal();
  }

  //Make a button for each pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon_list');
    let listPokemon = document.createElement('li');
    //button shows details of pokemon in console
    let button = document.createElement('button');
    button.addEventListener('click', function() {
      showDetails(pokemon, modalContainer);
    });
    button.innerText = pokemon.name;
    button.classList.add('button');
    button.classList.add('btn');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  //Adds name to console
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //Adds details to console
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        //item.abilities = details.abilites;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

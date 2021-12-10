//IIFE wrap
let pokemonRepository = (function () {
  let pokemonList = [
  {
    name: 'Golduck',
    height: 5,
    types: ['damp', 'cloud-nine', 'swift-swim']
  },
  {
    name: 'Wartorle',
    height: 6,
    types: ['rain-dish', 'torrent']
  },
  {
    name: 'Pidgeot',
    height: 3,
    types: ['keen-eye', 'tangled-feet', 'big-pecks']
  }
];



   function add(pokemon) {
     if (
       typeof pokemon === 'object'&&
     "name" in pokemon &&
     "height" in pokemon &&
     "types" in pokemon
   ) {
     pokemonList.push(pokemon)
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function showDetails(pokemon) {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon_list');
    let listPokemon = document.createElement('li');
    //button shows details of pokemon in console
    let button = document.createElement('button');
    button.addEventListener('click', function (showDetails){
      console.log(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();


pokemonRepository.add({ name: 'Blastoise', height: 4, types: ['rain-dish', 'torrent']});
pokemonRepository.add({name: 6 , height: 4, types: ['rain-dish', 'torrent']});


//buttons of each pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
//log pokemon details in console
/*
pokemonRepository.showDetails().forEach(function (pokemon) {
  console.log(pokemon);
});*/

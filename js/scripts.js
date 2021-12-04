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
    return pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


pokemonRepository.add({ name: 'Blastoise', height: 4, types: ['rain-dish', 'torrent']});


function myLoopFunction(pokemon) {
  document.write(pokemon.name + ' is ' + pokemon.height + '.','<br>','Types: ' + pokemon.types + '.', '<br>','<br>');
}
pokemonRepository.getAll().forEach(myLoopFunction);

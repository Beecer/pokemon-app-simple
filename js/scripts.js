const pokemonList=[
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

//loop lists Pokemon with height attribute
//for (let i=0; i < pokemonList.length; i++) {
//  if(pokemonList[i].height > 5) {
//  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')- Wow, that\'s big!)', '<br>');
//}else {
//  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')','<br>');
//  }
//

//pokemonList.forEach(function(pokemon) {
//  document.write(pokemon.name + ' is ' + pokemon.height + '.');
//});

function myLoopFunction(pokemon) {
  document.write(pokemon.name + ' is ' + pokemon.height + '.','<br>','Types: ' + pokemon.types + '.', '<br>','<br>');
}
pokemonList.forEach(myLoopFunction);

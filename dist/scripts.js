let pokemonRepository = (function() {
  let t = [],
    e =
      (document.querySelector('#exampleModal'),
      'https://pokeapi.co/api/v2/pokemon/?limit=150');
  function n(e) {
    'object' == typeof e && 'name' in e && 'detailsUrl' in e
      ? t.push(e)
      : console.log('pokemon is not correct');
  }
  function o(t) {
    i(t).then(function() {
      (function(t) {
        let e = $('.modal-body'),
          n = $('.modal-title');
        n.empty(), e.empty();
        let o = $('<h1>' + t.name + '</h1>'),
          i = $('<p>Heigth: ' + t.height + '</p>'),
          l = $('<p>Weight: ' + t.weight + '</p>'),
          c = $('<img class="modal-img" style="width:30%">');
        c.attr('src', t.imageUrl),
          n.append(o),
          e.append(i),
          e.append(l),
          e.append(c),
          $('#exampleModal').modal();
      })(t),
        console.log(t);
    });
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector('.pokemon_list'),
        n = document.createElement('li'),
        i = document.createElement('button');
      i.addEventListener('click', function() {
        o(t);
      }),
        (i.innerText = t.name),
        i.classList.add('button'),
        i.classList.add('btn'),
        n.appendChild(i),
        e.appendChild(n);
    },
    showDetails: o,
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});

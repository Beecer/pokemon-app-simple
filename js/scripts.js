//IIFE wrap
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Add pokemon
   function add(pokemon) {
     if (
       typeof pokemon === 'object'&&
     "name" in pokemon &&
     "detailsUrl" in pokemon
   ) {
     pokemonList.push(pokemon)
    } else {
      console.log("pokemon is not correct");
    }

  //Get all Pokemon
  }
  function getAll() {
    return pokemonList;
  }

  //Load pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon),
      console.log(pokemon)
    });
  }

  //Make a button for each pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon_list');
    let listPokemon = document.createElement('li');
    //button shows details of pokemon in console
    let button = document.createElement('button');
    button.addEventListener('click', function (){
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  //Adds name to console
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
    }

  //Adds details to console
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilites;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Real time email form validation
  (function() {
  let form = document.querySelector('#registration-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }


  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'E-mail is a required field.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid e-mail address.');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }

    if (value.length < 8) {
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }

    showErrorMessage(passwordInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }


  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
})();
  //End of form

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //add pokemon name here
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    // add pokemon details
    let contentElement = document.createElement('p');
    contentElement.innerText = ('Height:' + ' ' + pokemon.height);// redirect this

    // add image here
    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  let dialogPromiseReject;

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
   dialogPromiseReject();
   dialogPromiseReject = null;
    }
  }
  function showDialog(title, text) {
  showModal(title, text);

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();

  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null;
      hideModal();
      resolve();
    });
    dialogPromiseReject = reject;
  });
  }


  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails

  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

(function() {
  let canvas = document.querySelector('#canvas');
  let isDrawing = false;
  let previousX = null;
  let previousY = null;


  function handleStart(e) {
    isDrawing = true;
     // Initiate previousX/previousY
    let x = e.pageX; // X-coordinate of click/touch
    let y = e.pageY; // Y-coordinate of click/touch
    previousX = x;
    previousY = y;

  }

  function handleEnd() {
    isDrawing = false;
  }

  function handleMove(e) {
    // To prevent drawing on hover
    if (!isDrawing) {
      return;
    }

    let x = e.pageX; // X-coordinate of click/touch
    let y = e.pageY; // Y-coordinate of click/touch

    // This is canvas specific—we can use the context to draw shapes
    let ctx = canvas.getContext('2d');

    // Draw a line from previousX/previousY to x/y
    ctx.beginPath();
    ctx.moveTo(previousX, previousY);
    ctx.lineTo(x, y);

    // Set the style of the line
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();

    // Set previous coordinates for next move event
    previousX = x;
    previousY = y;
  }

  canvas.addEventListener("pointerdown", handleStart);
  canvas.addEventListener("pointerup", handleEnd);
  canvas.addEventListener("pointercancel", handleEnd);
  canvas.addEventListener("pointermove", handleMove);
})();

/* Canvas draw box
(function() {
  let canvas = document.querySelector('#canvas');
  let isDrawing = false;
  let previousX = null;
  let previousY = null;

  function handleStart(e) {
    isDrawing = true;

    //Initiate previousX/previousY
    let x = e.pageX; // X-coordinate of click/touch-action
    let y = e.pageY; // Y coordinate of click/touch-action
    previousX= x;
    previousY= y;
  }

  function handleEnd() {
    isDrawing = false;
  }

  function handleMove(e) {
    // To prevent drawing when hovering
    if(!isDrawing) {
      return;
    }

    let x= e.pageX;
    let y= e.pageY;
    //to draw
    //canvas specific- used to draw shapes
    let ctx= canvas.getContext('2d');

    //draw a line from previousX/previousY to x/y
    ctx.beginPath();
    ctx.moveTo(previousX, previousY);
    ctx.lineTo(x, y);

    //set line style
    ctx.lineWidth= 3;
    ctx.strokeStyle= '#ff0000';
    ctx.stroke();

    // set previous coordinates for next move
    previousX = x;
    previousY = y;
  }

  canvas.addEventListener('pointerdown', handleStart);
  canvas.addEventListener('pointerup', handleEnd);
  canvas.addEventListener('pointercancel', handleEnd);
  canvas.addEventListener('pointermove', handleMove);
})();
//End
*/

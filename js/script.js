// Create IIFE for app
var pokemonRepository = (function() {
  // Pokedex repository
  var repository = [];

  /*
  External APIs
  */
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // grab the list of pokemon
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
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
  // load details of pokemon
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // loop through types
        item.types = "";
        details.types.forEach(function(type) {
          item.types = type.type.name += "\n";
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  /*
  Client side functions
  */

  // function that adds a new pokemon into the app as a button in the DOM
  function addListItem(pokemon) {
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    // Adding var to the new Button element
    button.innerText = pokemon.name;
    // Creating a css class for clicking on the button
    button.classList.add("customButton");
    // Add button to li item
    listItem.appendChild(button);
    // Add list element to the Dom via the ul parent
    $newList.appendChild(listItem);
    // Add event listener to button element
    button.addEventListener("click", () => {
      showLoadingMessage();
      showDetails(pokemon);
    });
  }

  // function to log details of pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      var bodyContent =
        "Height: " +
        "\n" +
        pokemon.height +
        "\n" +
        "Types: " +
        pokemon.types +
        "\n";
      showModal(pokemon.name, bodyContent, pokemon.imageUrl);
      hideLoadingMessage();
    });
  }

  function showLoadingMessage() {
    // target loading class
    var $loading = document.querySelector(".loading-message-class");
    // Add CSS style to show loading message
    $loading.classList.add("shown");
  }

  function hideLoadingMessage() {
    // target loading class
    var $loading = document.querySelector(".loading-message-class");
    // wait 2 seconds for visual's sake
    setTimeout(function() {
      // Add CSS style to hide loading message
      $loading.classList.remove("shown");
    }, 500);
  }

  /* 
  Server side functions
  */

  //Adding Pokemon objects to the repo

  // function for checking duplicates
  function checkDuplicate(newPokemon) {
    for (var i = 0; i < repository.length; i++) {
      if (newPokemon.name === repository[i].name) {
        return true;
      }
    }
  }

  // Check there are the correct key names
  function checkKeys(pokemon) {
    pokemonKeysArray = Object.keys(pokemon);
    correctKeysArray = ["name", "height", "type"];
    array3 = 0;
    for (var i = 0; i < pokemonKeysArray.length; i++) {
      if (!correctKeysArray.includes(pokemonKeysArray[i])) {
        array3 += 1;
      }
      if (array3 > 0);
      {
        return false;
      }
    }
  }

  // function for checking the new pokemon has correct key fields
  function checkNumKeys(pokemon) {
    numKeys = Object.keys(pokemon);
    if (numKeys.length === 3) {
      return true;
    } else {
      return false;
    }
  }

  // simple add function ((for now)) so the checks below don't break things with Pokemon API
  function add(pokemon) {
    repository.push(pokemon);
  }

  // // add new Pokemon to repo
  // function add(pokemon) {
  //   // make sure type is object
  //   if (typeof pokemon === "object") {
  //     // check there aren't duplicates
  //     if (checkDuplicate(pokemon)) {
  //       return "There is already a pokemon with that name";
  //     } else {
  //       // check object has the correct number of keys
  //       if (checkNumKeys(pokemon)) {
  //         if (checkKeys(pokemon)) {
  //           repository.push(pokemon);
  //           return "Pokemon successfully added";
  //         } else {
  //           return "Incorrect Keys";
  //         }
  //       } else {
  //         return "Incorrect number of Keys in Pokemon object";
  //       }
  //     }
  //   } else {
  //     return "Wrong Data type. Need to use object type";
  //   }
  // }

  // search for a Pokemon
  function search(nameSearch) {
    var result = repository.filter(word => word.name === nameSearch);
    if (result.length > 0) {
      console.log("Here is your Pokemon:" + "<br>");
      // return the complete object of the relative Pokemon
      Object.keys(result[0]).forEach(function(property) {
        console.log("<br>" + property + ": " + result[0][property]);
      });
      return "There's a match!";
    } else {
      return "There is no Pokemon with that name in the Pokedex";
    }
  }

  function getAll() {
    return repository;
  }

  // Show modal
  // grab modal container
  var $modalContainer = document.querySelector("#modal-container");

  function showModal(title, text, url) {
    //Clear all existing modal content
    $modalContainer.innerHTML = "";
    // create new modal
    var modal = document.createElement("div");
    modal.classList.add("modal");

    // Add new modal content
    // button
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    // close modal
    closeButtonElement.addEventListener("click", hideModal);

    // title
    var titleElement = document.createElement("h1");
    titleElement.innerText = title;
    // wrap body content in a div
    var bodyWrapper = document.createElement("div");
    bodyWrapper.classList.add("body-element");
    // paragraph element
    var contentElement = document.createElement("p");
    contentElement.innerText = text;

    // img
    var imgWrapper = document.createElement("div");
    var imgElement = document.createElement("img");
    imgElement.src = url;

    // attach to DOM
    bodyWrapper.appendChild(closeButtonElement);
    bodyWrapper.appendChild(titleElement);
    bodyWrapper.appendChild(contentElement);
    imgWrapper.appendChild(imgElement);
    modal.appendChild(bodyWrapper);
    modal.appendChild(imgWrapper);
    $modalContainer.appendChild(modal);

    // add class to show element
    $modalContainer.classList.add("is-visible");
  }

  function showDialog(title, text) {
    showModal(title, text);

    // we want to add a confirm and cancel button to the modal
    var modal = $modalContainer.querySelector(".modal");

    var confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-confirm");
    confirmButton.innerText = "Confirm";

    var cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel");
    cancelButton.innerText = "Cancel";

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // help user focus on confirmButton to press enter
    confirmButton.focus();

    // Return promise that resolves when confirmed or else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener("click", hideModal);
      confirmButton.addEventListener("click", () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });

      // used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  function hideModal() {
    // grab modal (parent element)
    $modalContainer.classList.remove("is-visible");

    // if (dialogPromiseReject) {
    //   // this is the reject function from the Promise function
    //   dialogPromiseReject();
    //   dialogPromiseReject = null;
    // }
  }

  // // add event listener to element
  // document.querySelector("#show-modal").addEventListener("click", () => {
  //   showModal("Modal title", "This is the modal content!");
  // });

  // closing modal with esc button
  window.addEventListener("keydown", e => {
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

  $modalContainer.addEventListener("click", e => {
    // listens to clicks on container
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  // document.querySelector("#show-dialog").addEventListener("click", () => {
  //   showDialog("Confirm actions", "Are you sure you want to do this?").then(
  //     function() {
  //       alert("confirmed!");
  //     },
  //     () => {
  //       alert("not confirmed");
  //     }
  //   );
  // });

  return {
    add: add,
    getAll: getAll,
    search: search,
    loadList: loadList,
    addListItem: addListItem,
    showDetails: showDetails,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

var $newList = document.querySelector("ul");

pokemonRepository.showLoadingMessage();
// Make sure the Pokémon list is only rendered after you’ve gotten all information from the server.
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  pokemonRepository.hideLoadingMessage();
});

/* 
TESTING AREA

test typeof checker
pokemonRepository.add("Hitmonchan");

test checkDuplicate method
pokemonRepository.add({
  name: "pikachu",
  type: ["rock", "water"]
});

pokemonRepository.add({
  name: "Blastoise",
  type: ["rock", "water"]
});

// test searchPokemon
console.log(pokemonRepository.search("snorlax"));
console.log(pokemonRepository.search("Mewtwo"));


var testAdd = pokemonRepository.add({
  name: "pikajchu",
  type: ["rock", "water"],
  weihght: 56
});
console.log(testAdd);
*/

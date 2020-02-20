// Create IIFE for app
var pokemonRepository = (function() {
  // Pokedex repository
  var repository = [
    { name: "pikachu", height: "78", type: ["thunder", "grass"] },
    { name: "chameleon", height: "84", type: ["fire"] },
    { name: "bulbasaur", height: "54", type: ["grass"] },
    { name: "squirtle", height: "71", type: ["water"] },
    { name: "geodude", height: "38", type: ["rock", "grass"] },
    { name: "jigglypuff", height: "78", type: ["grass", "rock"] },
    { name: "meowth", height: "57", type: ["rock", "fire"] },
    { name: "snorlax", height: "120", type: ["rock", "water"] }
  ];

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
      showDetails(pokemon);
    });
  }

  // function to log details of pokemon
  function showDetails(pokemon) {
    console.log(pokemon);
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
  // add new Pokemon to repo
  function add(pokemon) {
    // make sure type is object
    if (typeof pokemon === "object") {
      // check there aren't duplicates
      if (checkDuplicate(pokemon)) {
        return "There is already a pokemon with that name";
      } else {
        // check object has the correct number of keys
        if (checkNumKeys(pokemon)) {
          if (checkKeys(pokemon)) {
            repository.push(pokemon);
            return "Pokemon successfully added";
          } else {
            return "Incorrect Keys";
          }
        } else {
          return "Incorrect number of Keys in Pokemon object";
        }
      }
    } else {
      return "Wrong Data type. Need to use object type";
    }
  }

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

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

var $newList = document.querySelector("ul");
// refactored forEach loop
Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  pokemonRepository.addListItem(pokemonRepository.getAll()[property]);
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

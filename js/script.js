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

  // function for checking duplicates
  function checkDuplicate(newPokemon) {
    for (var i = 0; i < repository.length; i++) {
      if (newPokemon.name === repository[i].name) {
        return true;
      }
    }
  }

  // function for checking the new pokemon has correct key fields
  function checkKeys(pokemon) {
    if (pokemon.length !== 3)
      console.log("Incorrect number of Keys in Pokemon object");
    return false;
  }

  // function that adds a new pokemon into the app as a button in the DOM
  function addListItem(pokemon) {
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    // Adding var to the new Button element
    button.innerHTML = pokemon.name;
    // Add list element to the Dom via the ul parent (automatically the last child)
    $newList.appendChild(listItem);
    // Access this last child and append the Pokemon button
    $lastListChild = $newList.lastElementChild;
    $lastListChild.appendChild(button);
    // Creating a css class for clicking on the button
    $lastListChild.classList.add("clickedButton");
    $lastListChild.addEventListener("click", showDetails);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // add new Pokemon to repo
  function add(pokemon) {
    // make sure type is object
    if (typeof pokemon === "object") {
      // check there aren't duplicates
      if (checkDuplicate(pokemon)) {
        console.log("There is already a pokemon with that name");
      } else {
        // check object has the correct number of keys
        if (checkKeys(pokemon)) {
          repository.push(pokemon);
        }
      }
    } else {
      console.log("Wrong Data type. Need to use object type");
    }
  }

  // search for a Pokemon
  function search(nameSearch) {
    var result = repository.filter(word => word.name === nameSearch);
    if (result.length > 0) {
      document.write("Here is your Pokemon:" + "<br>");
      // return the complete object of the relative Pokemon
      Object.keys(result[0]).forEach(function(property) {
        document.write("<br>" + property + ": " + result[0][property]);
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
*/

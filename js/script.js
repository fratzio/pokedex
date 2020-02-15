/*
Task 1.2
*/

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
Task 1.3
*/
document.write("<h1>Task 1.3</h1>");
// Creating a more dynamic function / take out hardcoded repo name
function printArrayDetails(repositoryNumber) {
  for (var i = 0; i < repositoryNumber.length; i++) {
    if (repositoryNumber[i].height > 100) {
      document.write(
        repositoryNumber[i].name +
          " (height: " +
          repositoryNumber[i].height +
          ') "Wow, that\'s big!"' +
          "<br>"
      );
    } else {
      document.write(
        repositoryNumber[i].name +
          " (height: " +
          repositoryNumber[i].height +
          ")" +
          "<br>"
      );
    }
  }
}
printArrayDetails(repository);

/*
Task 1.4
*/
document.write("<h1>Task 1.4</h1>");

// using forEach method with an object
repository.forEach(function(pokemon) {
  if (pokemon.height > 100) {
    document.write(
      pokemon.name +
        " (height: " +
        pokemon.height +
        ') "Wow, that\'s big!"' +
        "<br>"
    );
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br>");
  }
});

// forEach with the Object.keys method
Object.keys(repository).forEach(function(property) {
  if (repository[property].height > 100) {
    document.write(
      repository[property].name +
        " (height: " +
        repository[property].height +
        ') "Wow, that\'s big!"' +
        "<br>"
    );
  } else {
    document.write(
      repository[property].name +
        " (height: " +
        repository[property].height +
        ")" +
        "<br>"
    );
  }
});

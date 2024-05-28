let save = () => {
  // Check if the browser supports local storage
  if (localStorage) {
    // Convert the game state to a JSON string
    var gameState = JSON.stringify(state);
    // Save the game state to local storage
    localStorage.setItem("gameState", gameState);
  }
};

let load = () => {
  // Check if the browser supports local storage
  if (localStorage) {
    // Retrieve the game state from local storage
    var gameState = localStorage.getItem("gameState");
    // Convert the JSON string back to a JavaScript object
    var state = JSON.parse(gameState);
  }
};

save();
load();
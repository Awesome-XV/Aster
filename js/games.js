document.addEventListener('DOMContentLoaded', function() {
  let currentPage = 1;
  let gamesPerPage = 200;
  let totalGames = 0;
  let gamesData = [];
  let filteredGamesData = [];

  // Fetch and display games
  fetch('data/games.json')
    .then(response => {
      console.log(`Fetching games from data/games.json...`); // Debugging step
      console.log(`Response status: ${response.status}`); // Debugging step
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      gamesData = data;
      totalGames = gamesData.length;
      filteredGamesData = gamesData; // Initialize filtered data with all games
      displayGames();
    })
    .catch(e => {
      console.error('Error loading games:', e);
      alert('Failed to load games. Please check the console for more details.');
    });

  // Function to create game elements
  function createGameElement(game) {
    let gameDiv = document.createElement('div');
    gameDiv.className = "game";
    gameDiv.id = game.id;

    let gameLink = document.createElement('a');
    gameLink.href = `${game.id}/${game.htmlFile || 'index.html'}`;

    let gameImg = document.createElement('img');
    gameImg.src = `${game.id}/${game.imgSrc}`;
    gameImg.alt = game.id;

    let gameTitle = document.createElement('h1');
    gameTitle.textContent = game.title;

    // Combine them
    gameLink.appendChild(gameImg);
    gameLink.appendChild(gameTitle);
    gameDiv.appendChild(gameLink);

    return gameDiv;
  }

  // Function to display games based on the current page and games per page
  function displayGames() {
    const container = document.getElementById('games-container');
    container.innerHTML = '';
    const start = (currentPage - 1) * gamesPerPage;
    const end = start + gamesPerPage;
    const gamesToDisplay = filteredGamesData.slice(start, end);
    gamesToDisplay.forEach(game => {
      const gameElement = createGameElement(game);
      container.appendChild(gameElement);
    });
    updatePaginationControls();
  }

  // Function to update pagination controls
  function updatePaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(filteredGamesData.length / gamesPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.onclick = () => {
        currentPage = i;
        displayGames();
      };
      paginationControls.appendChild(pageButton);
    }
  }

  // Function to update the number of games per page
  function updateGamesPerPage() {
    gamesPerPage = parseInt(document.getElementById('gamesPerPage').value, 10);
    currentPage = 1;
    displayGames();
  }

  // Function to handle search
  function handleSearch(event) {
    const query = event.detail.query;
    filteredGamesData = gamesData.filter(game => game.title.toUpperCase().includes(query));
    currentPage = 1;
    displayGames();
  }

  // Add event listener to the dropdown
  document.getElementById('gamesPerPage').addEventListener('change', updateGamesPerPage);

  // Add event listener for search
  document.addEventListener('searchEvent', handleSearch);

  console.log("games.js loaded");
});
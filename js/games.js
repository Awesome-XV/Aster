document.addEventListener('DOMContentLoaded', function() {
  let currentPage = 1;
  let gamesPerPage = 150;
  let totalGames = 0;
  let gamesData = [];
  let searchQuery = '';

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
          console.log('Data fetched:', data); // Debugging step
          gamesData = data; // Assuming the data is an array of games
          totalGames = gamesData.length;
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
      gameLink.href = `${game.id}/index.html`;
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

  // Function to display games based on the current page, games per page, and search query
  function displayGames() {
      const container = document.getElementById('games-container');
      container.innerHTML = '';
      if (!gamesData || gamesData.length === 0) {
          console.error('No games data available to display.');
          return;
      }
      const filteredGames = gamesData.filter(game => 
          game.title.toUpperCase().includes(searchQuery) || 
          game.id.toUpperCase().includes(searchQuery)
      );
      const start = (currentPage - 1) * gamesPerPage;
      const end = start + gamesPerPage;
      const gamesToDisplay = filteredGames.slice(start, end);
      gamesToDisplay.forEach(game => {
          const gameElement = createGameElement(game);
          container.appendChild(gameElement);
      });
      updatePaginationControls(filteredGames.length);
  }

  // Function to update search query and display filtered games
  function updateSearchQuery(query) {
      searchQuery = query;
      currentPage = 1;
      displayGames();
  }

  // Listen for the custom search event
  document.addEventListener('searchEvent', (event) => {
      updateSearchQuery(event.detail.query);
  });

  // Function to update pagination controls based on the filtered total games
  function updatePaginationControls(filteredTotalGames) {
      const paginationControls = document.getElementById('pagination-controls');
      paginationControls.innerHTML = '';
      const totalPages = Math.ceil(filteredTotalGames / gamesPerPage);
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

  // Add event listener to the dropdown
  document.getElementById('gamesPerPage').addEventListener('change', updateGamesPerPage);
  console.log("games.js loaded");
});

let currentPage = 1;
let gamesPerPage = 5;
let gamesData = [];

// Function to get all cookies
function getCookies() {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    return cookies;
}

// Function to get all local storage data
function getLocalStorage() {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
    }
    return localStorageData;
}

// Function to download data as a JSON file
function downloadData() {
    const data = {
        cookies: getCookies(),
        localStorage: getLocalStorage()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "user_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Add event listener to the download button
document.getElementById('downloadDataButton').addEventListener('click', downloadData);

// Function to create game elements
function createGameElement(game) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const img = document.createElement('img');
    img.src = game.imgSrc;
    img.alt = game.title;

    const title = document.createElement('p');
    title.textContent = game.title;

    gameDiv.appendChild(img);
    gameDiv.appendChild(title);

    return gameDiv;
}

// Function to display games based on the current page and games per page
function displayGames() {
    const container = document.getElementById('games-container');
    container.innerHTML = '';
    const start = (currentPage - 1) * gamesPerPage;
    const end = start + gamesPerPage;
    const gamesToDisplay = gamesData.slice(start, end);
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
    const totalPages = Math.ceil(gamesData.length / gamesPerPage);
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

// Fetch and display games
fetch('data/games.json')
    .then(response => response.json())
    .then(games => {
        gamesData = games;
        displayGames();
    })
    .catch(error => console.error('Error loading games:', error));
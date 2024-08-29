// game loading thing
fetch('data/games.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("error " + response.status);
    }
    return response.json();
  })
  .then(data => {
    for (let game of data.games) {
      // create game cards
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

      // combine them
      gameLink.appendChild(gameImg);
      gameLink.appendChild(gameTitle);
      gameDiv.appendChild(gameLink);

      // add to page
      document.body.appendChild(gameDiv);
    }
  })
  .catch(e => {
    console.log('error: ' + e.message);
  });
  console.log("games.js loaded");
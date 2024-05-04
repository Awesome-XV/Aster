function search() {
  var input, filter, games, h1, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  games = document.getElementsByClassName("game");
  for (i = 0; i < games.length; i++) {
    h1 = games[i].getElementsByTagName("h1")[0];
    txtValue = h1.textContent || h1.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      games[i].style.display = "";
    } else {
      games[i].style.display = "none";
    }
  }
}
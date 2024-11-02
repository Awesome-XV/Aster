function search() {
  var input = document.getElementById("searchBar");
  var filter = input.value.toUpperCase();
  
  // Trigger custom event with the search query
  const searchEvent = new CustomEvent('searchEvent', { detail: { query: filter } });
  document.dispatchEvent(searchEvent);
}

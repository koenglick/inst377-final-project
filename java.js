var lookupButton = document.querySelector("#lookupButton");
var wordInput = document.querySelector("#wordInput");
var resultDiv = document.querySelector("#result");

lookupButton.addEventListener("click", function () {
  var word = wordInput.value;

  if (word === "") {
    resultDiv.textContent = "Please enter a German word.";
    return;
  }

  resultDiv.textContent = "Loading...";

  var url = "https://de.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&titles=" + encodeURIComponent(word) + "&origin=*";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var pages = data.query.pages;
      var pageId = Object.keys(pages)[0];
      var extract = pages[pageId].extract;

      if (extract === undefined || extract.trim() === "") {
        resultDiv.textContent = "No result found for: " + word;
        return;
      }

      resultDiv.textContent = extract;
    })
    .catch(function () {
      resultDiv.textContent = "Something went wrong. Please try again.";
    });

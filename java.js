var lookupButton = document.querySelector("#lookupButton");
var wordInput = document.querySelector("#wordInput");
var resultTitle = document.querySelector("#resultTitle");
var resultText = document.querySelector("#resultText");

lookupButton.addEventListener("click", function () {
  var word = wordInput.value;

  if (word === "") {
    resultTitle.textContent = "Result";
    resultText.textContent = "Please enter a German word.";
    return;
  }

  resultTitle.textContent = "Result";
  resultText.textContent = "Loading...";

  var url = "/api/lookup?lemma=" + encodeURIComponent(word);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var extract = data.extract;

      if (extract === undefined || extract.trim() === "") {
        resultTitle.textContent = "No Result";
        resultText.textContent = "No Wiktionary entry found for: " + word;
        return;
      }

      resultTitle.textContent = word;
      resultText.textContent = extract;
    })
    .catch(function () {
      resultTitle.textContent = "Error";
      resultText.textContent = "Something went wrong. Please try again.";
    });
});

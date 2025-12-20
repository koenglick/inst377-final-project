var lookupButton = document.querySelector("#lookupButton");
var wordInput = document.querySelector("#wordInput");
var resultDiv = document.querySelector("#result");

lookupButton.addEventListener("click", function () {
  var word = wordInput.value;

  if (word === "") {
    resultDiv.textContent = "Please enter a German word.";
    return;
  }

  resultDiv.textContent = word;
});

var lookupButton = document.querySelector("#lookupButton");
var wordInput = document.querySelector("#wordInput");
var resultDiv = document.querySelector("#result");

lookupButton.addEventListener("click", function () {
  var word = wordInput.value;
  resultDiv.textContent = word;
});

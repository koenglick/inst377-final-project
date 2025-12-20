console.log("test");

var lookupButton = document.querySelector("#lookupButton");
var wordInput = document.querySelector("#wordInput");

lookupButton.addEventListener("click", function () {
  var word = wordInput.value;
  console.log(word);
});

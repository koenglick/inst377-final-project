var map = L.map("map").setView([48.137, 11.575], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

L.marker([48.137, 11.575]).addTo(map)
  .bindPopup("Munich, Germany")
  .openPopup();

var chartCanvas = document.querySelector("#wordChart");

var chart = new Chart(chartCanvas, {
  type: "bar",
  data: {
    labels: ["Nouns", "Verbs", "Adjectives"],
    datasets: [
      {
        label: "Count",
        data: [2, 1, 0]
      }
    ]
  }
});

fetch("/api/words")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var savedWordsDiv = document.querySelector("#savedWords");
    savedWordsDiv.innerHTML = "";

    if (data.length === 0) {
      savedWordsDiv.textContent = "No words yet.";
      return;
    }

    var list = document.createElement("ul");

    data.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item.word;
      list.appendChild(li);
    });

    savedWordsDiv.appendChild(list);
  });

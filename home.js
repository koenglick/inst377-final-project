var map = L.map("map").setView([48.137, 11.575], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

L.marker([48.137, 11.575]).addTo(map)
  .bindPopup("Munich, Germany")
  .openPopup();

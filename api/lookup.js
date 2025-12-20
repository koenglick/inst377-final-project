export default function handler(req, res) {
  var lemma = req.query.lemma;

  if (!lemma) {
    res.status(400).json({ error: "Missing lemma" });
    return;
  }

  var url =
    "https://de.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=" +
    encodeURIComponent(lemma) +
    "&origin=*";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var pages = data.query.pages;
      var pageId = Object.keys(pages)[0];
      var extract = pages[pageId].extract;

      res.status(200).json({
        lemma: lemma,
        extract: extract || ""
      });
    })
    .catch(function () {
      res.status(500).json({ error: "Wiktionary fetch failed" });
    });
}

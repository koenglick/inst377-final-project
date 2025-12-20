export default function handler(req, res) {
  var lemma = req.query.lemma;

  if (!lemma) {
    res.status(400).json({ error: "Missing lemma" });
    return;
  }

  var url =
    "https://de.wiktionary.org/api/rest_v1/page/summary/" +
    encodeURIComponent(lemma);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res.status(200).json({
        lemma: lemma,
        extract: data.extract || ""
      });
    })
    .catch(function () {
      res.status(500).json({ error: "Wiktionary fetch failed" });
    });
}

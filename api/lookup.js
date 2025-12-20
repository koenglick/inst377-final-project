export default function handler(req, res) {
  var lemma = req.query.lemma;

  if (!lemma) {
    res.status(400).json({ error: "Missing lemma" });
    return;
  }

  function tryFetch(word) {
    var url =
      "https://de.wiktionary.org/api/rest_v1/page/summary/" +
      encodeURIComponent(word);

    return fetch(url, {
      headers: {
        "User-Agent": "inst377-final-project"
      }
    }).then(function (response) {
      var contentType = response.headers.get("content-type") || "";

      if (contentType.indexOf("application/json") === -1) {
        return response.text().then(function () {
          return { extract: "" };
        });
      }

      return response.json();
    });
  }

  tryFetch(lemma)
    .then(function (data) {
      if (data && data.extract) {
        res.status(200).json({ lemma: lemma, extract: data.extract });
        return;
      }

      return tryFetch(lemma.toLowerCase()).then(function (data2) {
        res.status(200).json({
          lemma: lemma,
          extract: (data2 && data2.extract) ? data2.extract : ""
        });
      });
    })
    .catch(function () {
      res.status(500).json({ error: "Wiktionary fetch failed" });
    });
}

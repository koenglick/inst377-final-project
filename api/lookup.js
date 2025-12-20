export default function handler(req, res) {
  var lemma = req.query.lemma;

  if (!lemma) {
    res.status(400).json({ error: "Missing lemma" });
    return;
  }

  function capitalizeFirstLetter(word) {
    if (!word) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

function getFirstDefinition(wikitext) {
  if (!wikitext) {
    return "";
  }

  var startIndex = wikitext.indexOf("{{Bedeutungen}}");
  if (startIndex === -1) {
    startIndex = wikitext.indexOf("=== {{Bedeutungen}} ===");
  }
  if (startIndex === -1) {
    startIndex = 0; // fallback
  }

  var textToScan = wikitext.substring(startIndex);
  var lines = textToScan.split("\n");

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    if (line.indexOf("#") === 0) {
      line = line.replace(/^#+\s*/, "");
      line = line.replace(/\[\[|\]\]/g, "");
      line = line.replace(/''/g, "");

      if (line !== "" && line.indexOf("{{") !== 0) {
        return line;
      }
    }
  }

  return "";
}


  function tryParse(word) {
    var url =
      "https://de.wiktionary.org/w/api.php?action=parse&format=json&prop=wikitext&page=" +
      encodeURIComponent(word) +
      "&origin=*";

    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  tryParse(lemma)
    .then(function (data) {
      // DEBUG
      if (req.query.debug === "1") {
        var wikitext = "";
        if (data && data.parse && data.parse.wikitext) {
          wikitext = data.parse.wikitext["*"] || "";
        }

        res.status(200).json({
          lemma: lemma,
          hasParse: !!(data && data.parse),
          wikitextStart: wikitext.substring(0, 800)
        });
        return;
      }

      if (data && data.parse && data.parse.wikitext) {
        var extract1 = getFirstDefinition(data.parse.wikitext["*"]);
        if (extract1) {
          res.status(200).json({ lemma: lemma, extract: extract1 });
          return;
        }
      }

      return tryParse(capitalizeFirstLetter(lemma)).then(function (dataCap) {
        if (dataCap && dataCap.parse && dataCap.parse.wikitext) {
          var extractCap = getFirstDefinition(dataCap.parse.wikitext["*"]);
          if (extractCap) {
            res.status(200).json({ lemma: lemma, extract: extractCap });
            return;
          }
        }

        return tryParse(lemma.toLowerCase()).then(function (data2) {
          var extract2 = "";

          if (data2 && data2.parse && data2.parse.wikitext) {
            extract2 = getFirstDefinition(data2.parse.wikitext["*"]);
          }

          res.status(200).json({ lemma: lemma, extract: extract2 || "" });
        });
      });
    })
    .catch(function () {
      res.status(500).json({ error: "Wiktionary fetch failed" });
    });
}

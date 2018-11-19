const express = require("express");
const path = require("path");
const forceDomain = require("forcedomain");

const app = express();
const port = 8081;

app.use(express.static(path.resolve("build")));

app.use(
  forceDomain({
    hostname: "www.pop.culture.gouv.fr",
    excludeRule: /elasticbeanstalk\.com/i
    // For later add: `protocol: 'https'`
  })
);

// Sitemap redirection
app.get("/sitemap/*", (req, res) => {
  const url = req.url.replace("/sitemap/", "");
  res.redirect(301, `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}`);
});

app.get("/notice/:collection/:ref", require("./ssr.js"));

app.route("*").all((req, res) => {
  let status = 404;
  if (
    /\/notice\/(merimee|palissy|mnr|joconde|memoire)\/\w+/.test(req.url) ||
    /\/search\/(list|map|mosaique)/.test(req.url) ||
    /\/opendata/.test(req.url)
  ) {
    status = 200;
  }

  res.status(status).sendFile(path.resolve("build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});

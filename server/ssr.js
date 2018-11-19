import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import API from "../src/services/api";
import Joconde from "./../src/scenes/notice/joconde";
import Mnr from "./../src/scenes/notice/mnr";
import NotFound from "./../src/components/NotFound";

async function exec(req, res) {
  const { ref, collection } = req.params;
  const notice = await API.getNotice(collection, ref);
  let app;
  if (!notice) {
    app = ReactDOMServer.renderToString(<NotFound />);
  } else {
    if (collection === "joconde") {
      app = ReactDOMServer.renderToString(<Joconde notice={notice} />);
    } else if (collection === "mnr") {
      app = ReactDOMServer.renderToString(<Mnr notice={notice} />);
    }
  }

  const indexFile = path.resolve("public/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
}

module.exports = exec;

import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import Notice from "./../src/scenes/notice";

function exec(req, res) {
  const app = ReactDOMServer.renderToString(<Notice />);

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

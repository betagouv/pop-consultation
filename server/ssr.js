import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import API from '../src/services/api'
import Notice from "./../src/scenes/notice/joconde";

async function exec(req, res) {

  const notice = await API.getNotice("joconde", "50010008178");
  const app = ReactDOMServer.renderToString(<Notice notice={notice}/>);
  console.log("app", app);

  const indexFile = path.resolve("public/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    console.log("SEND")
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
}

module.exports = exec;

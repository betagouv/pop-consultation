import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

// import ContextProvider from "./ContextProvider.js";

import API from "../src/services/api";
import Joconde from "./../src/scenes/notice/joconde";
import Mnr from "./../src/scenes/notice/mnr";
import Palissy from "./../src/scenes/notice/palissy";
import Merimee from "./../src/scenes/notice/merimee";
import Memoire from "./../src/scenes/notice/memoire";
import NotFound from "./../src/components/NotFound";

async function exec(req, res) {
  const { ref, collection } = req.params;

  const { body, css } = await getPage(collection, ref);
  const indexFile = path.resolve("public/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        .replace("</head>", ` <style type="text/css">${css}</style></head>`) //TODO pas ouf le replace </head>
    );
    //TODO Peut etre qu'on peut tout remplacer d'un coup
  });
}

function getPage(collection, ref) {
  return new Promise(async (resolve, reject) => {
    const css = new Set(); // CSS for all rendered React components
    const context = {
      insertCss: (...styles) =>
        styles.forEach(style => css.add(style._getCss()))
    };

    const notice = await API.getNotice(collection, ref);

    let app;

    if (!notice) {
      console.log("NOTICE NOT FOUND");
      app = <NotFound />;
    } else {
      if (collection === "joconde") {
        console.log("SHOW JOCONDE");
        app = <Joconde notice={notice} />;
      } else if (collection === "mnr") {
        app = <Mnr notice={notice} />;
      } else if (collection === "palissy") {
        app = <Palissy notice={notice} />;
      } else if (collection === "memoire") {
        app = <Memoire notice={notice} />;
      } else if (collection === "merimee") {
        app = <Merimee notice={notice} />;
      } else {
        console.log("collection not found ", collection);
        app = <NotFound />;
      }
    }

    const body = ReactDOMServer.renderToString(
      <ContextProvider context={context}>{app}</ContextProvider>
    );

    resolve({ body, css: [...css].join("") });
  });
}

import PropTypes from "prop-types";
class ContextProvider extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func
  };
  getChildContext() {
    return { ...this.props.context };
  }

  render() {
    return React.cloneElement(this.props.children, { ...this.props }); //TODO ici j'ai peut etre ralenti le schmilblick  en fait un clone
    // return <NotFound {...this.props} />;
  }
}

module.exports = exec;

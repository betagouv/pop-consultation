import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

// import ContextProvider from "./ContextProvider.js";

import API from "../src/services/api";
import Joconde from "./../src/scenes/notice/joconde";
import Mnr from "./../src/scenes/notice/mnr";
import Palissy from "./../src/scenes/notice/palissy";
import Merimee from "./../src/scenes/notice/merimee";
import Memoire from "./../src/scenes/notice/memoire";
import NotFound from "./../src/components/NotFound";

import { Provider } from "react-redux";
import { store, history } from "./../src/redux/store";
import PublicRoutes from "./../src/router";

async function exec(req, res) {
  //const { ref, collection } = req.params;
  // const { body, css } = await getPage(collection, ref, req);
  const css = new Set(); // CSS for all rendered React components
  const injectCssContext = {
    insertCss: (...styles) => {
      return styles.forEach(style => {
          if(style) {
            //console.log(style._getCss())
            css.add(style._getCss());
          }
      })
    }
  };
  const staticRouterContext = { };
  const body = ReactDOMServer.renderToString(
    <Provider store={store}>
        <StaticRouter context={staticRouterContext} location={ req.url }>
          <ContextProvider context={injectCssContext}>
            <PublicRoutes history={history} />
          </ContextProvider>
        </StaticRouter>
    </Provider>
  );
  const cssString = [...css].join("");

  const indexFile = path.resolve("build/index-template.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        .replace("</head>", ` <style type="text/css">${cssString}</style></head>`) //TODO pas ouf le replace </head>
    );
    //TODO Peut etre qu'on peut tout remplacer d'un coup
  });
}

function getPage(collection, ref, req) {
  return new Promise(async (resolve, reject) => {
    const css = new Set(); // CSS for all rendered React components
    const injectCssContext = {
      insertCss: (...styles) => {
        return styles.forEach(style => {
            if(style) {
              //console.log(style._getCss())
              css.add(style._getCss());
            }
        })
      }
    };
    const staticRouterContext = { };

    const notice = await API.getNotice(collection, ref);

    /*let app;

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
    }*/

    const body = ReactDOMServer.renderToString(
      <Provider store={store}>
          <StaticRouter context={staticRouterContext} location={ req.url }>
            <ContextProvider context={injectCssContext}>
              <PublicRoutes history={history} />
            </ContextProvider>
          </StaticRouter>
      </Provider>
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
    return React.cloneElement(this.props.children, { ...this.props });
  }
}

module.exports = exec;

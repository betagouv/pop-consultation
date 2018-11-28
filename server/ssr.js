import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { Provider } from "react-redux";
import createStore from "./../src/redux/store";
import PublicRoutes from "./../src/router";

async function exec(req, res) {
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
  const { store, history } = createStore(req.url);
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

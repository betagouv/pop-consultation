import path from "path";
import fs from "fs";

import React from "react";
import { Helmet } from "react-helmet";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

import { Provider } from "react-redux";
import createStore from "./../src/redux/store";
import PublicRoutes from "./../src/router";
import ContextProvider from "./../src/ContextProvider";

import { onFetch, onCollectionFetch } from '../src/redux/sagas';

async function exec(req, res) {
  const css = new Set(); // CSS for all rendered React components
  const injectCssContext = {
    insertCss: (...styles) => {
      return styles.forEach(style => {
        if (style) {
          css.add(style._getCss());
        }
      });
    }
  };
  const { store, history } = createStore(req.url);
  
  const matchNotice = matchPath( req.url, {
    path: `/notice/:baseNotice/:ref`,
    exact: false,
    strict: false
  } );

  if(matchNotice 
    && matchNotice.params 
    && matchNotice.params.ref 
    && matchNotice.params.baseNotice
    && ( 
      matchNotice.params.baseNotice === "joconde" 
      || matchNotice.params.baseNotice === "memoire" 
      || matchNotice.params.baseNotice === "merimee"
      || matchNotice.params.baseNotice === "mnr"
      || matchNotice.params.baseNotice === "palissy"
    )
  ) {
    const notice = await onFetch({base: matchNotice.params.baseNotice, ref: matchNotice.params.ref});
    if(matchNotice.params.baseNotice === "joconde" || matchNotice.params.baseNotice === "mnr") {
      store.dispatch({
        type: "notice/DID_FETCH",
        notice,
        links: null,
      })
    } else if(matchNotice.params.baseNotice === "memoire" || matchNotice.params.baseNotice === "merimee" || matchNotice.params.baseNotice === "palissy") {
      const links = await onCollectionFetch(notice, matchNotice.params.baseNotice);
      store.dispatch({
        type: "notice/DID_FETCH",
        notice,
        links,
      })
    }
  }
  
  const staticRouterContext = {};
  const body = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={staticRouterContext} location={req.url}>
        <ContextProvider context={injectCssContext}>
          <PublicRoutes history={history} />
        </ContextProvider>
      </StaticRouter>
    </Provider>
  );
  const helmetData = Helmet.renderStatic( );
  const cssString = [...css].join("");

  const indexFile = path.resolve("build/index-template.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    let status = 404;
    if (
      req.url === "" ||
      req.url === "/" ||
      /\/notice\/(merimee|palissy|mnr|joconde|memoire)\/\w+/.test(req.url) ||
      /\/search\/(list|map|mosaique)/.test(req.url) ||
      /\/opendata/.test(req.url)
    ) {
      status = 200;
    }
    return res.status(status).send(
      data
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        .replace('<div id=root></div>', `<div id="root">${body}</div>`)
        .replace(
          "<title>POP - Plateforme Ouverte du Patrimoine</title>",
          ` ${ helmetData.title.toString( ) }
          ${ helmetData.meta.toString( ) }`
        )
        .replace(
          "</head>",
          ` <style type="text/css">${cssString}</style></head>`
        ) //TODO pas ouf le replace </head>
    );
  });
}

module.exports = exec;

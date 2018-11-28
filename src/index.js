import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import WebFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import createStore from "./redux/store";
import PublicRoutes from "./router";

const { store, history } = createStore();

dotenv.load();

if (process.env.NODE_ENV === "production") {
  Raven.config(
    "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21",
    {
      release: "pop-consultation-" + require("../package.json").version
    }
  ).install();
}

WebFont.load({
  google: {
    families: ["Open Sans", "Comfortaa:400,700", "sans-serif"]
  }
});

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

const css = new Set(); // CSS for all rendered React components
const injectCssContext = {
  insertCss: (...styles) => {
    return styles.forEach(style => {
        if(style) {
          // console.log(style._getCss())
          css.add(style._getCss());
        }
    })
  }
};

ReactDOM.hydrate(
  <Provider store={store}>
        <ContextProvider context={injectCssContext}>
          <PublicRoutes history={history} />
        </ContextProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

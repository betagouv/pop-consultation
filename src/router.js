import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
//import { ConnectedRouter } from "react-router-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./scenes/header";
import Footer from "./scenes/footer";
import NotFound from "./components/NotFound";

import Home from "./scenes/home";
import Search from "./scenes/search";
import Opendata from "./scenes/opendata";
import Notice from "./scenes/notice";

// import PiwikReactRouter from "piwik-react-router";

import ScrollToTop from "./components/ScrollToTop";

import styles from './index.css';

// const piwik = PiwikReactRouter({
//   url: "https://stats.data.gouv.fr",
//   siteId: 63
// });
// piwik.push([
//   "setDomains",
//   ["*.pop.beta.gouv", "*.pop.culture.gouv.fr", "*.production.pop.beta.gouv.fr"]
// ]);

class PublicRoutes extends React.Component {
  componentWillReceiveProps(newProps) {}

  render() {
    return (
      // <ConnectedRouter history={piwik.connectToHistory(this.props.history)}>
        <div className="main">
          <ScrollToTop />
          <Header />
          <ErrorBoundary>
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route path={"/search"} component={Search} />
              <Route exact path={"/opendata"} component={Opendata} />
              <Route path={"/notice/:ref"} component={Notice} />
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
          <Footer />
        </div>
      // </ConnectedRouter>
    );
  }
}

export default withStyles(styles)(PublicRoutes);

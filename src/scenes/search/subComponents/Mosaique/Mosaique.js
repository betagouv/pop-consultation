import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import CardMosaique from "./CardMosaique";

import styles from './CardMosaique.css';

const Mosaique = ({ filter }) => (
  <ReactiveList
    componentId="results"
    react={{
      and: filter
    }}
    onResultStats={(total, took) => {
      const info = "La mosaïque n'affiche par défaut que les notices avec image.";
      if (total === 1) {
        return <span>1 résultat <i class="text-muted">{info}</i></span>;
      }
      return <span>{total} résultats. <i class="text-muted">{info}</i></span>;
    }}
    onNoResults="Aucun résultat trouvé."
    loader="Préparation de l'affichage des résultats..."
    dataField=""
    URLParams={true}
    size={18}
    className="mosaique-view"
    onData={data => <CardMosaique key={data.REF} data={data} />}
    // pagination={true}
  />
);

export default withStyles(styles)(Mosaique);
import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import CardList from "./CardList";

import styles from './CardList.css';

const List = ({ filter }) => (
    <ReactiveList
        componentId="results"
        react={{
        and: filter
        }}
        onResultStats={(total, took) => {
            if (total === 1) {
                return `1 résultat`;
            }
            return `${total} résultats`;
        }}
        dataField=""
        onNoResults="Aucun résultat trouvé."
        loader="Préparation de l'affichage des résultats..."
        URLParams={true}
        size={20}
        className="list-view"
        onData={data => (
            <CardList className="" key={data.REF} data={data} />
        )}
        // pagination={true}
    />
);


export default withStyles(styles)(List);

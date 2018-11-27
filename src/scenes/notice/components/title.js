import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from "./title.css";


class Title extends React.Component {
  render() {
    const hasVisibleFields = !!this.props.fields.filter(
      f =>
        Array.isArray(this.props.notice[f])
          ? this.props.notice[f].length
          : this.props.notice[f]
    ).length;
    if (hasVisibleFields) {
      return <h2>{this.props.content}</h2>;
    }
    return <div />;
  }
}

export default withStyles(styles)(Title);
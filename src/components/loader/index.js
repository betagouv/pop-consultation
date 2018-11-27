import React from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from './index.css';

const loader = ({isOpen = true}) => isOpen?(
   <div className='loader-container'>
      <div id="loader"/>
  </div>
) : null;

export default withStyles(styles)(loader);





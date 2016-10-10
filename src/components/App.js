import React, {Component} from 'react';
import {render} from 'react-dom';

import styles from './App.css';
import Header from './Header/Header';
import Map from './Map/Map';

class App extends Component {
  render(){
    return (
      <div>
        <Header className={styles.header} />
        <Map />
      </div>
    );
  }
}

export default App;

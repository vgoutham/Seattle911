import React, {Component} from 'react';
import render from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import styles from './Map.css';
import config from '../../../config.js';

mapboxgl.accessToken = config.MAPBOX_TOKEN;
const MAPBOX_STYLES = config.MAPBOX_STYLES;

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let map = new mapboxgl.Map({
      container: 'map',
      style: MAPBOX_STYLES,
      center: [-122.3321, 47.6062],
      zoom: 11
    });
  }

  render() {
    return <div id="map" className={styles.map} />;
  }
}

export default Map;

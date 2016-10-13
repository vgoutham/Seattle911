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

    map.on('load', function() {

        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true.
        map.addSource("incidents", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: "http://localhost:3000",
            cluster: true,
            clusterMaxZoom: 20, // Max zoom to cluster points on
            clusterRadius: 25 // Radius of each cluster when clustering points (defaults to 50)
        });

        // Use the earthquakes source to create five layers:
        // One for unclustered points, three for each cluster category,
        // and one for cluster labels.
        map.addLayer({
            "id": "unclustered-points",
            "type": "symbol",
            "source": "incidents",
            "filter": ["!has", "point_count"],
            "layout": {
                "icon-image": "marker-15"
            }
        });

        // Display the data in three layers, each filtered to a range of
        // count values. Each range gets a different fill color.
        let layers = [
            [500, '#f28cb1'],
            [100, '#f1f075'],
            [0, '#51bbd6']
        ];

        layers.forEach(function (layer, i) {
            map.addLayer({
                "id": "cluster-" + i,
                "type": "circle",
                "source": "incidents",
                "paint": {
                    "circle-color": layer[1],
                    "circle-radius": 18
                },
                "filter": i === 0 ?
                    [">=", "point_count", layer[0]] :
                    ["all",
                        [">=", "point_count", layer[0]],
                        ["<", "point_count", layers[i - 1][0]]]
            });
        });

        // Add a layer for the clusters' count labels
        map.addLayer({
            "id": "cluster-count",
            "type": "symbol",
            "source": "incidents",
            "layout": {
                "text-field": "{point_count}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-size": 12
            }
        });
      });
    }

  render() {
    return <div id="map" className={styles.map} />;
  }
}

export default Map;

'use strict';
const mongoose = require('mongoose');
const debug = require('debug')('seattle911:neighbourhood');

let NeighbourhoodSchema = mongoose.Schema({
  properties: {
    area: {type: String, required: true}
  },
  geometry: {
    type: {type: String, default: 'MultiPolygon'},
    enum: [
      'MultiPoint',
      'LineString',
      'MultiLineString',
      'Polygon',
      'MultiPolygon'
    ]},
    coordinates: {type: Array}
});

module.exports = mongoose.model('Neighbourhood', NeighbourhoodSchema) ;

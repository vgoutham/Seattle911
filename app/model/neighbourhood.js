'use strict';
const mongoose = require('mongoose');
const debug = require('debug')('seattle911:neighbourhood');
const Promise = require('bluebird');
const readdir = Promise.promisify(require('fs').readdir);
const readfile = Promise.promisify(require('fs').readFile);
const _= require('lodash');
require('../../server');
mongoose.Promise = Promise;

let NeighbourhoodSchema = mongoose.Schema({
  properties: {
    area: {type: String, required: true}
  },
  geometry: {
    type: String,
    enum: [
      'MultiPoint',
      'LineString',
      'MultiLineString',
      'Polygon',
      'MultiPolygon'
    ]},
    coordinates: {type: Array}
});

let Neighbourhood = mongoose.model('Neighbourhood', NeighbourhoodSchema) ;

readdir('geojson').then((files)=>{
  files.forEach((file)=>{
    readfile(`./geojson/${file}`).then((geoObj)=>{
      let str = file.slice(0, -8);
      neighbourhoodGeo(geoObj).then((geo)=>{
        let addAreaName = _.merge(JSON.parse(geo), {properties: {area: str }});
        let NeighbourhoodArea = new Neighbourhood(addAreaName);
        NeighbourhoodArea.save();
      });
    });
  });//end of forEach
})
.catch((err)=>{
  debug(err);
  console.error(err);
});//end of readdir

let neighbourhoodGeo = module.exports = (geoObj)=>{
  return new Promise((resolve, reject)=>{
    resolve(geoObj.toString());
  });
};

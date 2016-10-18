'use strict';
const debug = require('debug')('seattle911:incident_point');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const IncidentPointSchema = mongoose.Schema({
  _id: {type: Number, required: true},
  type: {type: String, default: 'Feature'},
  properties: {
    event_super_group: {type: String, required: true},
    event_clearance_group: {type: String, required: true},
    event_clearance_subgroup : {type: String, required: true},
    event_clearance_description : {type: String},
    hundred_block_location: {type: String},
    event_clearance_date : {type: Date, default: Date.now},
  },
  geometry : {
    type: {type: String, default: 'Point'},
    coordinates: [{type: [Number], index: '2dsphere'}]
  }
});

module.exports = mongoose.model('IncidentPoint', IncidentPointSchema);

'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const IncidentPointSchema = mongoose.Schema({
  properties: {
    cad_cdw_id: {type: Number, required: true},
    cad_event_number: {type: Number, required: true},
    event_clearance_group: {type: String, required: true},
    event_clearance_subgroup : {type: String, required: true},
    event_clearance_description : {type: String},
    hundred_block_location: {type: String},
    event_clearance_date : {type: Date, default: Date.now},
  },
  loc: {
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2dsphere'}
  }
});

module.exports = mongoose.model('IncidentPoint', IncidentPointSchema);

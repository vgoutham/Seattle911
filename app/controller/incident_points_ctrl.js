'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');
const _= require('lodash');
const supergroupProp = require('./reformat_data');

//upsertingng data
module.exports.storeIncidentPoints = (arr)=>{
  debug('storeIncidentPoints');
  arr.forEach((data)=>{
    let Point = new IncidentPoint(data);
    debug('about to be saved in db, but has pre hook in ./model.incident_point.js');
    debug(Point);
    Point.save();
  });
};//end of storeIncidentPoints fn


//adding event_super_group
module.exports.addSuperGroup = (res)=>{
  debug('addSuperGroup');
    let incidents = _.map(res.features, function(incident) {
      return _.merge(incident,
        { _id: incident.properties.cad_event_number,
          properties: {event_super_group: supergroupProp[incident.properties.event_clearance_group]}
        });
      });
      return incidents;
}; //end of addSuperGroup fn

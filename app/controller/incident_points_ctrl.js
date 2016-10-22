'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

let option;
let newSetOfData = [];

//upsertingng data
module.exports.storeIncidentPoints = (arr)=>{
  debug('storeIncidentPoints');
  arr.forEach((data)=>{
    let Point = new IncidentPoint(data);
    debug('about to be saved in db, but has pre hook in ./model.incident_point.js');
    debug(Point);
    Point.save();
  });
}//end of storeIncidentPoints fn


//adding event_super_group
module.exports.addSuperGroup = (res)=>{
  debug('addSuperGroup');
    let obj = JSON.parse(dataObj);
    let incidents = _.map(res.features, function(incident) {
      return _.merge(incident,
        { _id: incident.properties.cad_event_number,
          properties: {event_super_group: superGroups[incident.properties.event_clearance_group]}
        })
      });
}; //end of addSuperGroup fn

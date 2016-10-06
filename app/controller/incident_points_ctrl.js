'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

//saves data
function storeIncidentPoints (data){
  let option = {
    properties: {
      cad_cdw_id: data.cad_cdw_id,
      cad_event_number: data.cad_event_number,
      event_clearance_group: data.event_clearance_group,
      event_clearance_subgroup : data.event_clearance_subgroup,
      event_clearance_description : data.event_clearance_description,
      hundred_block_location: data.hundred_block_location,
      event_clearance_date : data.event_clearance_date,
    },
    loc: {
      type: 'Point',
      coordinates: data.incident_location.coordinates
    }
  }
  let Point = new IncidentPoint(option);
  Point.save((err, point)=>{
    debug(point);
    if(err) return console.error(err);
  });
};

//iterater - called in route.js get '/' route
module.exports.iterateThruData = (dataArr)=>{
  debug('iterateThruData');
  dataArr.forEach((data)=>{
    storeIncidentPoints(data);
  });
};

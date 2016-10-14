'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

//saves data
function storeIncidentPoints(data){
  // console.log(data);
  let option = {
        type: 'Feature',
        properties: {
          cad_cdw_id: data.cad_cdw_id,
          cad_event_number: data.cad_event_number,
          event_super_group: data.event_super_group,
          event_clearance_group: data.event_clearance_group,
          event_clearance_subgroup : data.event_clearance_subgroup,
          event_clearance_description : data.event_clearance_description,
          hundred_block_location: data.hundred_block_location,
          event_clearance_date : data.event_clearance_date,
        },
        geometry: {
          type: 'Point',
          coordinates: data.incident_location.coordinates
        }
      };//end of features

  let Point = new IncidentPoint(option);
  Point.save((err, point)=>{
    if(err) return debug(err);
    debug(point);
  });
}//end of storeIncidentPoints fn

//iterater - called in route.js get '/' route
function iterateThruData(dataArr, cb){
  debug('iterateThruData!!!');
  dataArr.forEach((data)=>{
    cb(data); //storeIncidentPoints cb
  });
}

module.exports.addSuperGroup = function(arrData, group, cb){
  debug('addSuperGroup');
  cb = iterateThruData;
  arrData.map((data)=>{
    for (let category in group) {
      if(data['event_clearance_group'] === category){
        data['event_super_group'] = group[category];
      }
      iterateThruData(arrData, storeIncidentPoints);
    }
  });
}; //end of addSuperGroup fn

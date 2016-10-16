'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

let option;
let newSetOfData = [];

//re-alllocating each data to a property
module.exports.storeIncidentPoints = function (arr){
  debug('storeIncidentPoints');
  // debug(arr);
  let newArr = arr.map((obj)=>{
    option = {
          type: 'Feature',
          properties: {
            cad_cdw_id: obj.cad_cdw_id,
            cad_event_number: obj.cad_event_number,
            event_super_group: obj.event_super_group,
            event_clearance_group: obj.event_clearance_group,
            event_clearance_subgroup : obj.event_clearance_subgroup,
            event_clearance_description : obj.event_clearance_description,
            hundred_block_location: obj.hundred_block_location,
            event_clearance_date : obj.event_clearance_date,
          },
          geometry: {
            type: 'Point',
            coordinates: obj.incident_location.coordinates
          }
        };//end of features
        return option;
  });
    debug('asisgned to new schema');
    saveDataInDB(newArr);
}//end of storeIncidentPoints fn

//saving data in db
function saveDataInDB (arr){
  arr.forEach((obj)=>{
    let Point = new IncidentPoint(obj);
    Point.save((res)=>{
      debug(res);
    })
    .catch((err)=>{
      console.error('error', err);
    });
  });
}

//adding event_super_group
module.exports.addSuperGroup = function(arrData, group, cb){
  debug('addSuperGroup');
  let arr = arrData.map((data)=>{
    var obj = data;
    debug('arrData.map');
    for (var category in group){
      if(obj['event_clearance_group'] === category){
        obj['event_super_group'] = group[category];
      }
    }
    return obj;
  });
  cb(arr);
}; //end of addSuperGroup fn

'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

let option;
let newSetOfData = [];

//upsertingng data
module.exports.storeIncidentPoints = function (arr){
  debug('storeIncidentPoints');
  arr.forEach((data)=>{
    let Point = new IncidentPoint(data);
    debug('about to be saved in db, but has pre hook in ./model.incident_point.js');
    debug(Point);
    Point.save();
  });
}//end of storeIncidentPoints fn


//adding event_super_group
module.exports.addSuperGroup = function(dataObj, group, cb){
  debug('addSuperGroup');
    let obj = JSON.parse(dataObj);
    let newObj = obj['features'].map((obj)=>{
      let temp = obj;
      temp['_id'] = temp['properties']['cad_event_number']
      delete temp['properties']['cad_cdw_id'];
      delete temp['properties']['zone_beat'];
      delete temp['properties']['event_clearance_code'];
      delete temp['properties']['initial_type_subgroup'];
      delete temp['properties']['initial_type_group'];
      delete temp['properties']['census_tract'];
      delete temp['properties']['general_offense_number'];
      delete temp['properties']['initial_type_group'];
      delete temp['properties']['incident_location_zip'];
      delete temp['properties']['district_sector'];
      delete temp['properties']['incident_location_city'];
      delete temp['properties']['at_scene_time'];
      delete temp['properties']['latitude'];
      delete temp['properties']['longitude'];

      for (var category in group){
        if(temp['properties']['event_clearance_group'] === category){
          temp['properties']['event_super_group'] = group[category];
        }
      }
      return temp;
    });
  // debug(newObj);
  cb(newObj);
}; //end of addSuperGroup fn

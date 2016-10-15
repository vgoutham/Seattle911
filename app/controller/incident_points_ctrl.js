'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');

  var option;
//saves data
function storeIncidentPoints(data){
  // console.log(data);
  option = {
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
      saveDataInDB(option);
}//end of storeIncidentPoints fn

function saveDataInDB (opt){
  
    let Point = new IncidentPoint(opt);
        debug('saveDataInDB');
        debug(Point);
    Point.save((err, point)=>{
      if(err) return debug(err);
      debug(point);
    });

}

//iterater - called in route.js get '/' route
 // module.exports.iterateThruData = function(dataArr, res){
 function iterateThruData(dataArr, res){
  debug('iterateThruData!!!');
  dataArr.forEach((data)=>{
    storeIncidentPoints(data, res);
  });
}

module.exports.addSuperGroup = function(arrData, group){
  debug('addSuperGroup');
  let arr = arrData.map((data)=>{
    var obj = data;
    debug('arrData.map');
    // debug(obj);
    for (var category in group){
      if(obj['event_clearance_group'] === category){
        obj['event_super_group'] = group[category];
        storeIncidentPoints(obj);
        debug(obj);
        return obj;
      }
    }
  });
}; //end of addSuperGroup fn

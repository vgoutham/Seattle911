'use strict';
const SocrataData = require('./socrata_data');//getDataSet fn
const MapPoint = require('../model/incident_point');//map point model
const IncidentPointsCtrl = require('./incident_points_ctrl'); //add supergroup & save in mlab
const superGroup = require('./sort_data').superGroups;


module.exports.getNewSetOfData = function(){
  let dataSet = [];
  SocrataData.getDataSet()
  .then((data)=>{
    let parsedData = JSON.parse(data);
    IncidentPointsCtrl.addSuperGroup(parsedData, superGroup, IncidentPointsCtrl.storeIncidentPoints);
  })
  .catch((err)=>{
    console.error('error', err);
  });
}; //end of getNewSetOfData

function saveDataToMLab (){

}

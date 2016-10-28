'use strict';
const debug = require('debug')('seattle911:config.db');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const config = require('./config');
const IncidentPoint = require('./app/model/incident_point');
const Neighbourhood = require('./app/model/neighbourhood');
const superGroups = require('./app/controller/reformat_data');
const getIncidentPoints = require('./app/controller/request_incidentPoints');
const readdir = Promise.promisify(require('fs').readdir);
const readfile = Promise.promisify(require('fs').readFile);

mongoose.connect(config.db);

IncidentPoint.collection.drop();

const startDate = moment().subtract(1, 'month').format().slice(0, -6); //1 month prior to current datetime
const endDate = moment().format().slice(0, -6); //current datetime

//Get last month of incidents points from Socrata API
getIncidentPoints(startDate, endDate).then((response) => {
  //then add _id and super groups to each incident
  let incidents = _.map(response.features, function(incident) {
    return _.merge(incident,
      { _id: incident.properties.cad_event_number,
        properties: {event_super_group: superGroups[incident.properties.event_clearance_group]}
      }
    );
  });

  //Insert database with incidents
  IncidentPoint.collection.insert(incidents, (err, res) => {
    if(err) throw err;
    console.log(`${res.insertedCount} incidents added to database!`);
    mongoose.connection.close();
  });
});


readdir('geojson').then((files)=>{
  files.forEach((file)=>{
    readfile(`./geojson/${file}`).then((geoObj)=>{
      let str = file.slice(0, -8);
      neighbourhoodGeo(geoObj).then((geo)=>{
        let addAreaName = _.merge(JSON.parse(geo), {properties: {area: str }});
        let NeighbourhoodArea = new Neighbourhood(addAreaName);
        NeighbourhoodArea.save();
      });
    });
  });//end of forEach
})
.catch((err)=>{
  debug(err);
  console.error(err);
});//end of readdir

let neighbourhoodGeo = module.exports = (geoObj)=>{
  return new Promise((resolve, reject)=>{
    resolve(geoObj.toString());
  });
};

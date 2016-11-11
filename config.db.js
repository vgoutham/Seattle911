'use strict';
const debug = require('debug')('seattle911:config.db');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const config = require('./config');
const IncidentPoint = require('./app/model/incident_point');
const Neighbourhood = require('./app/model/neighbourhood');
const getIncidentPoints = require('./app/controller/request_incidentPoints');
const IncidentPointCtr = require('./app/controller/incident_points_ctrl');
const readdir = Promise.promisify(require('fs').readdir);
const readfile = Promise.promisify(require('fs').readFile);

mongoose.connect(config.db);

IncidentPoint.collection.drop();
Neighbourhood.collection.drop();

const startDate = moment().subtract(1, 'month').format().slice(0, -6); //1 month prior to current datetime
const endDate = moment().format().slice(0, -6); //current datetime

//Get last month of incidents points from Socrata API
getIncidentPoints.getSocrataData(startDate, endDate).then((response) => {
  //then add _id and super groups to each incident
  debug(response.data.features.length);
  const incidents = IncidentPointCtr.addSuperGroup(response.data);
  //Insert database with incidents
  IncidentPoint.collection.insert(incidents, (err, res) => {
    if(err) throw err;
    console.log(`${res.insertedCount} incidents added to database!`);
    mongoose.disconnect();
  });
});

readdir('neighborhoods').then((files) => {
  files.forEach((file) => {
    readfile(`./neighborhoods/${file}`).then((geojson) => {
      const neighborhood = file.slice(0, -8);
      const addAreaName = _.merge(JSON.parse(geojson.toString()), {properties: {area: neighborhood}});
      const NeighbourhoodArea = new Neighbourhood(addAreaName);
      NeighbourhoodArea.save();
    });
  });
})
.catch((err) => {
  debug(err);
  console.error(err);
});

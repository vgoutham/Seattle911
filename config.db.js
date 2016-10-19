'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const config = require('./config');
const IncidentPoint = require('./app/model/incident_point');
const superGroups = require('./app/controller/sort_data');
const getIncidentPoints = require('./app/controller/request_incidentPoints');

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

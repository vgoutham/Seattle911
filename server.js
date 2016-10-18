'use strict';
const debug = require('debug')('seattle911:server');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const config = require('./config');
const IncidentPoint = require('./app/model/incident_point');
const superGroups = require('./app/controller/sort_data');
const getIncidentPoints = require('./app/controller/request_incidentPoints');

mongoose.connect(config.db);

//Update database with new data every hour
//Get incidents from Socrata API -> map event_clearance_group to super group -> update to database
const updateInterval = 1000 * 60 * 60;  //1 hour in milliseconds
setInterval(() => {
    const startDate = moment().subtract(1, 'days').format().slice(0, -6); //24 hours prior to current datetime
    const endDate = moment().format().slice(0, -6); //current datetime

    //Get last 24 hrs of incidents points from Socrata API, then add _id and super groups to incidents
    getIncidentPoints(startDate, endDate).then((response) => {
      let incidents = _.map(response.features, function(incident) {
        return _.extend({}, incident,
          { _id: incident.properties.cad_event_number,
            event_super_group: superGroups[incident.properties.event_clearance_group]
          }
        );
      });
      //Bulk update database with new incidents points
      let bulk = IncidentPoint.collection.initializeUnorderedBulkOp();
      incidents.forEach(incident => {
        bulk.find({_id: incident._id}).upsert().updateOne(incident);
      });
      bulk.execute((err, res) => {
        if(err) throw err;
        console.log(`Database succesfully updated with ${res.nUpserted} new incidents!`);
      });
    });
  },
  updateInterval
);

app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
app.use(cors({'Accept-Encoding': ['gzip']}));
app.use(bodyParser.json());

app.listen(config.port, () => {console.log(`Server is running on port: ${config.port}`);});

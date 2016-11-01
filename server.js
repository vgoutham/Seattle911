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

const PORT = process.env.PORT || 3000;
const config = require('./config');
const IncidentPoint = require('./app/model/incident_point');
const getIncidentPoints = require('./app/controller/request_incidentPoints').getSocrataData;
const IncidentPointCtr = require('./app/controller/incident_points_ctrl');
require('./app/routes.js')(app);

mongoose.connect(config.db);

//Update database with new data every hour
//Get incidents from Socrata API -> map event_clearance_group to super group -> update to database
const updateInterval = 1000 * 60 * 60;  //1 hour in milliseconds
setInterval(() => {
  const startDate = moment().subtract(1, 'days').format().slice(0, -6); //24 hours prior to current datetime
  const endDate = moment().format().slice(0, -6); //current datetime

  //Get last 24 hrs of incidents points from Socrata API
  getIncidentPoints(startDate, endDate).then((response) => {
    //then add _id and super groups to each incident
    let incidentPoints = IncidentPointCtr.addSuperGroup(response.data);

    //Bulk update database with new incidents
    let bulk = IncidentPoint.collection.initializeUnorderedBulkOp();
    incidentPoints.forEach((incident) => {
      bulk.find({_id: incident._id}).upsert().updateOne(incident);
    });
    bulk.execute((err, res) => {
      if(err) throw err;
      console.log(`Database succesfully updated with ${res.nUpserted} new incidents!`);
    });
  });
}, updateInterval);

app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
app.use(cors({'Accept-Encoding': ['gzip']}));
app.use(bodyParser.json());

app.listen(PORT, () => {console.log(`Server is running on port: ${PORT}`);});

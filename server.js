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
const updateInterval = 1000 * 60 * 60;
setInterval(() => {
    const startDate = moment().subtract(1, 'days').format().slice(0, -6); //24 hours prior to current datetime
    const endDate = moment().format().slice(0, -6); //current datetime

    getIncidentPoints(startDate, endDate).then((res) => {
      let arr = _.map(res.features, function(element) {
        return _.extend({}, element,
          { _id: element.properties.cad_event_number,
            event_super_group: superGroups[element.properties.event_clearance_group]
          }
        );
      });

      let bulk = IncidentPoint.collection.initializeUnorderedBulkOp();
      arr.forEach(element => {
        bulk.find({_id: element._id}).upsert().updateOne(element);
      });
      bulk.execute((err, res) => {
        if(err) throw err;
      });
    });
  },
  updateInterval
);

app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
app.use(cors({'Accept-Encoding': ['gzip']}));
app.use(bodyParser.json());

app.listen(config.port, () => {console.log(`Server is running on port: ${config.port}`);});

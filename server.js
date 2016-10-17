'use strict';
const debug = require('debug')('seattle911:server');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.js');
const mongoose = require('mongoose');
const Socrata = require('./app/controller/socrata_data.js');
const PointController = require('./app/controller/incident_points_ctrl.js');
const AllocateData = require('./app/controller/sort_data');
const Moment = require('moment');
require('./app/routes.js')(app, morgan, Socrata, PointController);

// mongoose.connect(config.db);
app.use(cors({
  'Accept-Encoding': ['gzip']
}));
app.use(bodyParser.json());

//every 24 hours updates data
  // TODO: use momentjs to change dates
Socrata.getDataSet('2016-09-01T00:00:00','2016-09-30T23:59:00')
.then((data)=>{
  // debug(data);
  PointController.addSuperGroup(data, AllocateData.superGroups, PointController.storeIncidentPoints);
})
.catch((err)=>{
  debug(err);
});

// }, 100000);
// getDataEveryDay.getNewSetOfData();


const server = app.listen(config.port, () => {console.log(`Server is running on port: ${config.port}`);});
server.isRunning = true;
module.exports = server;

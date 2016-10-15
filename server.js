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
const getDataEveryDay = require('./app/controller/');
require('./app/routes.js')(app, morgan, Socrata, PointController);

mongoose.connect(config.mLabURI);
app.use(cors());
app.use(bodyParser.json());

//every 24 hours updates data
setInterval(()=>{
  getDataEveryDay.getNewSetOfData();
}, 10000);
// getDataEveryDay.getNewSetOfData();


const server = app.listen(config.port, () => {console.log(`Server is running on port: ${config.port}`);});
server.isRunning = true;
module.exports = server;

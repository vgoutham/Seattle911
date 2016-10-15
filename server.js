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
require('./app/routes.js')(app, morgan, Socrata, PointController);
// const MongoCli = require('mongodb').MongoCli;
// MongoCli.connect(config.MONGOLAB_URI, function(err, db){
//   if(err){
//     console.log('err', err);
//     return;
//
//   }
//   console.log('connected??', db);
// });
mongoose.connect(config.MONGOLAB_URI);
app.use(cors());
app.use(bodyParser.json());



const server = app.listen(config.port, ()=>{debug(`Port ${config.port} is listening..`);});
server.isRunning = true;
module.exports = server;

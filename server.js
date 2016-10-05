'use strict';
const debug = require('debug')('seattle911:server');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require(`${__dirname}/env.js`);

const Socrata = require(`${__dirname}/app/controller/socrata_data.js`);
require(`${__dirname}/app/routes.js`)(app, morgan, Socrata);

app.use(bodyParser.json());



const server = app.listen(config.port, ()=>{debug(`Port ${config.port} is listening..`);});
server.isRunning = true;
module.exports = server;

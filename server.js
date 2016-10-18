'use strict';
const debug = require('debug')('seattle911:server');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Moment = require('moment');

const config = require('./config.js');
const Socrata = require('./app/controller/socrata_data.js');

mongoose.connect(config.db);

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(
  cors({'Accept-Encoding': ['gzip']})
);

app.use(bodyParser.json());

//Update database with new data every hour
const interval = 1000 * 60 * 60;
setInterval(
  function(){
    //Update Db here
  },
  interval
);

app.listen(config.port, () => {console.log(`Server is running on port: ${config.port}`);});

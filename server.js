'use strict';
const debug = require('debug')('seattle911:server');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


app.use(bodyParser);



const server = app.listen(port, ()=>{debug(`Port ${port} is listening..`);});

server.isRunning = true;
module.exports = server;
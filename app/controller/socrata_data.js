'use stirct';

const debug = require('debug')('seattle911:socrata_data');
const express = require('express');
const app = express();
const Promise = require('bluebird');
const config = require('../../env.js');
const http = require('https');

//data source controller 
module.exports.getDataSet = ()=>{
	return new Promise((resolve, reject)=>{
		var req = http.get(config.socrataURL, (res)=>{
			res.setEncoding('utf8');
			debug('socrata_data');
			debug(res.statusCode);
			debug(res.headers);
			res.on('data', (data)=>{
				resolve(data);
				console.log('end of request', data);
			});
		});
		req.on('error', (err)=>{
			console.error(err);
			reject(err);
		});
	});//promise end
}//end of module.exports

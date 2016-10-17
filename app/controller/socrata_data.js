'use strict';

const debug = require('debug')('seattle911:socrata_data');
const express = require('express');
const app = express();
const Promise = require('bluebird');
const config = require('../../config.js');
const https = require('https');

//data source controller
module.exports.getDataSet = (startDate, endDate)=>{
	return new Promise((resolve, reject)=>{
		let req = https.get(`${config.socrataURL}%20between%20%22${startDate}%22%20and%20%22${endDate}%22&$limit=10`,  (res)=>{
			let str = '';
			res.setEncoding('utf8');
			debug('socrata_data');
			debug(res.statusCode);
			res.on('data', (data)=>{
			str += data;
			}).on('end', ()=>{
				debug('end of response');
				resolve(str);
			});
		});
		req.on('error', (err)=>{
			debug(err);
			reject(err);
		});
	});//promise end
};//end of module.exports

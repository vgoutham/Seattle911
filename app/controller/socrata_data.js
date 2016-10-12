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
		var req = http.get(`${config.socrataURL}&$limit=25`, (res)=>{ //using var because node complains..
			var str = '';
			res.setEncoding('utf8');
			debug('socrata_data');
			debug(res.statusCode);
			debug(res.headers);
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

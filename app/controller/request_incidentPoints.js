'use strict';

const debug = require('debug')('seattle911:socrata_data');
const Promise = require('bluebird');
const config = require('../../config.js');
const request = Promise.promisify(require('request').get);

// const request = require('request');

const baseUrl = 'https://data.seattle.gov/';

module.exports.getSocrataData = (startDate, endDate) => {
	debug('hitting Socrata api');
	return new Promise ((resolve, reject)=>{
		request(`${baseUrl}resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`)
		.then((res)=>{
			debug('socrata_data');
			resolve({status: res.statusCode, data: JSON.parse(res.body)});
		})
		.catch((err)=>{
			debug(err);
			reject(err);
		});
	});
};

// return request(`${baseUrl}/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`).then((res)=>{
// 	debug('socrata_data');
// 	debug(res.statusCode);
// 	return JSON.parse(res.body);
// });

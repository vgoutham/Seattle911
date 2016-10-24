'use strict';

const debug = require('debug')('seattle911:socrata_data');
const Promise = require('bluebird');
const config = require('../../config.js');
// const request = Promise.promisify(require('request'));
const request = require('request');

const baseUrl = 'https://data.seattle.gov/';

module.exports.getSocrataData = (startDate, endDate, cb) => {
	debug('hitting Socrata api');
	request.get(`${baseUrl}resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`, (err, res)=>{
		debug('socrata_data');
		cb(JSON.parse(res.body));
		return JSON.parse(res.body);
	});
		// return request(`${baseUrl}/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`).then((res)=>{
		// 	debug('socrata_data');
		// 	debug(res.statusCode);
		// 	return JSON.parse(res.body);
		// });
};

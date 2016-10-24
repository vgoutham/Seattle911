'use strict';

const debug = require('debug')('seattle911:socrata_data');
const Promise = require('bluebird');
const config = require('../../config.js');
const request = Promise.promisify(require('request'));
// const rp = require('request-promise');

module.exports.getSocrataData = (startDate, endDate) => {
	debug('hitting Socrata api');
	const dataQueryURL = `${config.socrataURL}/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`;
		return request(dataQueryURL).then((res)=>{
			debug('socrata_data');
			debug(res.statusCode);
			return JSON.parse(res.body);
		});
};

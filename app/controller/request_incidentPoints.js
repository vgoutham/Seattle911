'use strict';

const debug = require('debug')('seattle911:socrata_data');
const Promise = require('bluebird');
const config = require('../../config.js');
const request = Promise.promisify(require('request'));

module.exports = (startDate, endDate) => {
	const dataQueryURL = `${config.socrataURL}?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`;
	debug('queryURL');
	debug(dataQueryURL);
	return request(dataQueryURL).then((res) => {
		debug('socrata_data');
		debug(res.statusCode);
		return JSON.parse(res.body);
	});
};

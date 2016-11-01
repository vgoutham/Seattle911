'use strict';
const debug = require('debug')('seattle911:request_incidentPoints');
const Promise = require('bluebird');
const request = Promise.promisify(require('request').get);
const IncidentPoint = require('../model/incident_point');
const NeighbourhoodGeo = require('../model/neighbourhood');
const mongoose = require('mongoose');

const baseUrl = 'https://data.seattle.gov/resource/pu5n-trf4.geojson';

module.exports.getSocrataData = (startDate, endDate) => {
	debug('hitting Socrata api');
	return new Promise ((resolve, reject) => {
		request(`${baseUrl}?$where=event_clearance_date%20between%20"${startDate}"%20and%20"${endDate}"`)
		.then((res)=>{
			debug('socrata_data');
			resolve({status: res.statusCode, data: JSON.parse(res.body)});
		})
		.catch((err) => {
			debug(err);
			reject(err);
		});
	});
};

module.exports.getAreaGeo = (areaName) => {
	debug('getAreaGeo');
	return new Promise ((resolve, reject) => {
		NeighbourhoodGeo.findOne({properties: {area: areaName}})
		.then((areaGeoCords)=>{
			resolve(areaGeoCords);
		});
	});
};

module.exports.getPointsWithinArea = (areaGeo) => {
	debug('getPointsWithinArea');
	return new Promise ((resolve, reject) => {
		IncidentPoint.find({geometry: { $geoWithin: { $geometry: { type: 'MultiPolygon' , coordinates: areaGeo.coordinates }}}})
		.then((points)=>{
			resolve(points);
		});
	});
};

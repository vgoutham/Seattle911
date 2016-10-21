'use strict';
const debug = require('debug')('seattle911:routes');
const IncidentPoint = require('./model/incident_point');
const SortData = require('./controller/reformat_data');

module.exports = function(app){
//get route '/'
	app.get('/', (req, res)=>{
		debug('app.get /');
		IncidentPoint.find({},{'_id': 0, 'properties.latitude': 0, 'properties.zone_beat': 0, 'properties.event_clearance_code': 0, 'properties.incident_location_address': 0, 'properties.longitude': 0, 'properties.incident_location_state': 0, 'properties.district_sector': 0, 'properties.incident_location_city': 0, 'properties.at_scene_time': 0})
		.then((qData)=>{
			debug('app.get /\ .then');
			res.header("Access-Control-Allow-Origin", "*");
			res.json({"type": "FeatureCollection", "features": qData});
		});
	});

};//end of module.exports

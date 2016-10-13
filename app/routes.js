'use strict';
const debug = require('debug')('seattle911:routes');
const IncidentPoint = require('./model/incident_point');
const SortData = require('./controller/sort_data');

module.exports = function(app, morgan, Socrata, Point){
	//get '/fetchdata' grabs data from socrata, and stores in our db (local db for now)
	app.get('/fetchdata', (req, res)=>{
		debug('app.get /fetchdata');
		Socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			let parsedData = JSON.parse(data);
			Point.addSuperGroup(parsedData, SortData.superGroups);
			res.json({msg: 'data received and stored in our db'});
		}).catch((err)=>{
			res.json({msg: err});
		});
	});

//get route '/'
	app.get('/', (req, res)=>{
		debug('app.get /');
		IncidentPoint.find({})
		.then((qData)=>{
			debug('app.get /\ .then');
		//	var parsedQData = JSON.parse(qData);
			var arr = [];
			qData.map((data)=>{
				debug('app.get /\ parsedQData.map');
				const option = {
							type: 'Feature',
							properties: {
								cad_cdw_id: data.properties.cad_cdw_id,
								cad_event_number: data.properties.cad_event_number,
								event_super_group: data.properties.event_super_group,
								event_clearance_group: data.properties.event_clearance_group,
								event_clearance_subgroup : data.properties.event_clearance_subgroup,
								event_clearance_description : data.properties.event_clearance_description,
								hundred_block_location: data.properties.hundred_block_location,
								event_clearance_date : data.properties.event_clearance_date,
							},
							geometry: {
								type: 'Point',
								coordinates: data.geometry.coordinates
							}
						};//end of features
				arr.push(option);
			});
			res.header("Access-Control-Allow-Origin", "*");
			res.json({type:'FeatureCollection', features: arr});
		});
	});

};//end of module.exports

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
			res.json({data: qData});
		});
	});

};//end of module.exports

'use strict';
const debug = require('debug')('seattle911:routes');

module.exports = function(app, morgan, Socrata, Point){
	//get '/' route will call fn which grabs data from socrata, and store in our db (local db for now)
	app.get('/', (req, res)=>{
		debug('app.get /');
		Socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			console.log(data);
			let parsedData = JSON.parse(data);
			Point.iterateThruData(parsedData);
			let coords = parsedData.map((obj)=>{
				return {
					event_clearance_group: obj.event_clearance_group,
					incident_location: obj.incident_location
				}
			});
			res.json({data: coords});
		}).catch((err)=>{
			console.error(err);
		});
	});
}//end of module.exports

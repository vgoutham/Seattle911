'use strict';
const debug = require('debug')('seattle911:routes');

module.exports = function(app, morgan, socrata){
	app.get('/', (req, res)=>{
		debug('app.get /');
		socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			console.log(data);
			let parsedData = JSON.parse(data);
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

'use strict';
const debug = require('debug')('seattle911:routes');

module.exports = function(app, morgan, socrata){
	app.get('/', (req, res)=>{
		debug('app.get /');
		socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			let parsedData = JSON.parse(data);
			let coords = parsedData.map((obj)=>{
				return {
					event_clearance_group: obj.event_clearance_group,
					latitude: obj.latitude,
					longitude: obj.longitude,
				}
			});
			res.json({data: coords});
		}).catch((err)=>{
			console.error(err);
		});
	});
}//end of module.exports

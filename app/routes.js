'use strict';
const debug = require('debug')('seattle911:routes');

module.exports = function(app, morgan, Socrata, Point){
	//get '/' route will call fn which grabs data from socrata, and store in our db (local db for now)
	app.get('/', (req, res)=>{
		debug('app.get /');
		Socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			let parsedData = JSON.parse(data);
			res.json({data: parsedData});
		}).catch((err)=>{
			console.error(err);
		});
	});
}//end of module.exports

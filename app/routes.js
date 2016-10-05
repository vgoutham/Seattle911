'use strict';
const debug = require('debug')('seattle911:routes');

module.exports = function(app, morgan, socrata){
	app.get('/', (req, res)=>{
		debug('app.get /');
		socrata.getDataSet()
		.then((data)=>{
			debug('inside of then');
			console.log('data', data);
		}).catch((err)=>{
			console.error(err);
		});

		res.end();
	});
}//end of module.exports

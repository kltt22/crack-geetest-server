
let mongoose = require('mongoose');
let config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URL, {
    useMongoClient: true
}, function (err) {
	if (err) {
		Log.fatal('connect to %s error: ', config.MONGODB_URL, err.message);
		process.exit(1);
	}
});

let Query = exports.Query = require('./query');
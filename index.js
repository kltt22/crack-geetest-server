
let http = require('http');
let app = require('./src/app');
let config = require('./src/config');

async function startup() {
    try {
		const net = http.createServer();
		net.on('request', app.callback());

		net.listen(config.SERVER.PORT, config.SERVER.HOSTNAME);
		config.Log.info(`http://${config.SERVER.HOSTNAME}:${config.SERVER.PORT}`);
	} catch (e) {
		config.Log.fatal(e);
		config.Log.fatal('Exiting');
		process.exit(1);
		return;
	}
	config.Log.info('WirScope Started');
}

startup();
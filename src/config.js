let path = require('path');
let fs = require('fs');
let log4js = require('log4js');
let yaml = require('js-yaml');
let _ = require('lodash');

let config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'config.yml'), 'utf-8'));

// 运行版本
let env_test = exports.env_test = process.env.NODE_ENV == 'test';
let env_production = exports.env_production = process.env.NODE_ENV == 'production';
let env_development = exports.env_development = !env_test && !env_production;

// 日志相关
log4js.configure({
	appenders: {
		CrackGeetestServer: { type: 'console' }
	},
	categories: {
		default: { appenders: ['CrackGeetestServer'], level: 'debug' }
	}
});
const Log = exports.Log = log4js.getLogger('CrackGeetestServer');

// 服务器实例
const SERVER = exports.SERVER = _.pick(config['SERVER'], 'HOSTNAME', 'PORT', 'COOKIES_KEY', 'URL_PREFIX');
if (_.endsWith(SERVER.URL_PREFIX, '/')) SERVER.URL_PREFIX = SERVER.URL_PREFIX.slice(0, SERVER.URL_PREFIX.length - 1);

// 数据库相关
if ('MONGO_HOST' in process.env && 'REDIS_HOST' in process.env) { // for docker
	exports.MONGODB_URL = `mongodb://${process.env['MONGO_HOST']}/${config['MONGODB']['DATABASE']}`;
} else {
	exports.MONGODB_URL = `mongodb://${config['MONGODB']['HOSTNAME']}/${config['MONGODB']['DATABASE']}`;
}

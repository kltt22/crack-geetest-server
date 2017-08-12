
let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let mount = require('koa-mount');

require('should');

let config = require('./config');
let { Query } = require('./models');

const app = module.exports = new Koa();

app.keys = [config.SERVER.COOKIES_KEY];

app.use(require('koa-logger')());

app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.state.query = new Query();
    ctx.state.query.ip = ctx.ip;
    ctx.state.query.path = ctx.path;
    ctx.state.query.query = ctx.query;
    if ('x-real-ip' in ctx.headers)
        ctx.state.query.ip = ctx.headers['x-real-ip'];

    await next();

    if (ctx.body) {
        ctx.state.query.success = ctx.body.success;
        ctx.state.query.body = ctx.body;
    }

    await ctx.state.query.save();
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.state.query.error_message = err.message;
        ctx.state.query.error_stack = err.stack;
        ctx.body = {
            success: -1,
            error_msg: err.message
        }
    }
});

const router = new Router();

router.get('/ping', async (ctx, next) => {
    ctx.body = 'pong';
});

app.use(mount(router.routes()));

app.use(mount('/api/v1', require('./apis/v1.js').routes()));
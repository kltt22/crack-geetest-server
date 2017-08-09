
let should = require('should');
let Router = require('koa-router');
let crack_geetest = require('../../libs/5.10.10');

const router = module.exports = new Router();

router.get('', async (ctx, next) => {
    should(ctx.request.query).be.an.Object();
    should(ctx.request.query).have.property('gt').be.a.String().and.not.empty();
    should(ctx.request.query).have.property('challenge').be.a.String().and.not.empty();
    should(ctx.request.query).have.property('site').be.a.String().and.not.empty();

    let rst = await crack_geetest(ctx.request.query.gt, ctx.request.query.challenge, ctx.request.query.site);
    if (rst) ctx.body = rst;
    else ctx.body = { success: 0 };
});

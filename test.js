
require('should');
let app = require('./src/app');
let request = require('superagent').agent();

app.listen(3245);
const URL_PREFIX = 'http://localhost:3245/';

async function testOnce() {
    let config = JSON.parse((await request.get('http://bj.gsxt.gov.cn/pc-geetest/register').query({t: Date.now()})).text);
    config.gt.should.be.a.String().and.not.empty();
    config.challenge.should.be.a.String().and.not.empty();

    let crack = (await request.get(URL_PREFIX + 'api/v1').query({
        gt: config.gt,
        challenge: config.challenge,
        site: 'http://bj.gsxt.gov.cn/sydq/loginSydqAction!sydq.dhtml'
    })).body;
    crack.should.be.an.Object().and.have.property('success').an.Number();
    console.log(crack);
    return crack.success == 1;
}

async function test() {
    const T = 30;
    let accepted = 0;
    for(let i = 0; i < T; i ++)
        if (await testOnce()) accepted ++;
    console.log(accepted, T);
}

async function run() {
    await test();
    process.exit(0);
}

run();
# crack geetest server, 极限验证码破解网站

目前网站已经部署在`geetest.chenyu0x00.com`上了，你可以通过与`http://geetest.chenyu0x00.com/api/v1`交互对geetest进行破解。

例:

```sh
> curl http://geetest.chenyu0x00.com/api/v1?gt=73a7e78f77d457e28a6ad4f12d4bb63e&challenge=1c383cd30b7c298ab50293adfecb7b187c&site=http%3A%2F%2Fbj.gsxt.gov.cn%2Fsydq%2FloginSydqAction!sydq.dhtml
```

## APIv1

* GET /api/v1?gt=[gt]&challenge=[challenge]&site=[site]

## 联系方式

欢迎大家和我(believe.chenyu@gmail.com)交流经验
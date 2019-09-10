'use strict';

const Koa = require('koa');
const app = new Koa();
const port = 3000;
const X_RESPONSE_TIME = 'x-response-time';

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get(X_RESPONSE_TIME);
    console.log(`${ctx.method} ${ctx.url} - ${rt}ms`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set(X_RESPONSE_TIME, ms);
});

app.use(async (ctx) => {
    ctx.body = 'Hello World';
});

app.listen(port);
# [@koa/router](https://github.com/koajs/router)

> Router middleware for [Koa](https://github.com/koajs/koa).

[![NPM version](https://img.shields.io/npm/v/@koa/router.svg?style=flat)](https://npmjs.org/package/@koa/router) 
[![NPM Downloads](https://img.shields.io/npm/dm/@koa/router.svg?style=flat)](https://npmjs.org/package/@koa/router) 
[![Node.js Version](https://img.shields.io/node/v/@koa/router.svg?style=flat)](http://nodejs.org/download/)
[![Build Status](https://img.shields.io/travis/koajs/router.svg?style=flat)](http://travis-ci.org/koajs/router)
[![gitter](https://img.shields.io/gitter/room/koajs/koa.svg?style=flat)](https://gitter.im/koajs/koa)

* Express-style routing (`app.get`, `app.put`, `app.post`, etc.)
* Named URL parameters
* Named routes with URL generation
* Responds to `OPTIONS` requests with allowed methods
* Support for `405 Method Not Allowed` and `501 Not Implemented`
* Multiple route middleware
* Multiple and nestable routers
* `async/await` support
* Dynamic middleware

## Migrating to 7 / Koa 2

- The API has changed to match the new promise-based middleware
  signature of koa 2. See the [koa 2.x readme](https://github.com/koajs/koa/tree/2.0.0-alpha.3) for more
  information.
- Middleware is now always run in the order declared by `.use()` (or `.get()`,
  etc.), which matches Express 4 API.

## Installation

```bash
# npm .. 
npm i https://github.com/anhhao-me/rugo-router.git
# yarn .. 
yarn add https://github.com/anhhao-me/rugo-router.git
```

## [API Reference](./API.md)

## New Features

### Dynamic Middleware

```js
const app = new Koa();
const router = new Router();

const injectMiddleware = (ctx) => {
  ctx.body = {
    foo: 'bar'
  }
};

router.get('/', async (ctx, next, use) => {
  use(injectMiddleware);
  await next();
});

app.use(router.routes());
app.listen(3000);
```

### Dynamic Routing

```js
const app = new Koa();
const router = new Router();

router.use('/foo(.*)', async (ctx, next, use) => {
  ctx.routerPath = ctx.params['0'];

  const dynamicRouter = new Router();
  dynamicRouter.get('/bar', ctx => {
    ctx.body = {
      foo: 'bar'
    };
  });
  

  use(dynamicRouter.routes());
  await next();
});

app.use(router.routes());
app.listen(3000);
```


## Contributing

Please submit all issues and pull requests to the [koajs/router](http://github.com/koajs/router) repository!

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/koajs/router/issues).

## Call for Maintainers

This module is forked from the original [koa-router](https://github.com/ZijianHe/koa-router) due to its lack of activity. `koa-router` is the most widely used router module in the Koa community and we need maintainers. If you're interested in fixing bugs or implementing new features feel free to open a pull request. We'll be adding active contributors as collaborators.

Thanks to the original authors @alexmingoia and the original team for their great work.

### License

[MIT](LICENSE)
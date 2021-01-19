/**
 * Dynamic middleware test
 */

const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const methods = require('methods');
const path = require('path');
const request = require('supertest');
const Router = require('../../lib/router');
const Layer = require('../../lib/layer');
const expect = require('expect.js');
const should = require('should');
const assert = require('assert');


describe('Dynamic middleware', function () {
  it('should run dynamic middleware', function (done) {
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
    request(http.createServer(app.callback()))
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('foo', 'bar');
        done();
      });
  });

  it('should run dynamic routing', function (done) {
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

    request(http.createServer(app.callback()))
    .get('/foo/bar')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).to.have.property('foo', 'bar');
      done();
    });
  });
});
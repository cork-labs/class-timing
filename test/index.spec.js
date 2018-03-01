'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

const httpTiming = require('../src/index');

describe('httpTiming ()', function () {
  it('should be a function', function () {
    expect(httpTiming).to.be.a('function');
  });

  describe('when invoked', function () {
    beforeEach(function () {
      this.config = {};
      this.middleware = httpTiming(this.config);
    });

    it('should return a middleware function', function () {
      expect(this.middleware).to.be.a('function');
      expect(this.middleware.length).to.equal(3);
    });

    describe('when the middleware function is invoked', function () {
      beforeEach(function () {
        this.req = {};
        this.res = {};
        this.nextSpy = sinon.spy();
        this.middleware(this.req, this.res, this.nextSpy);
      });

      it('should invoke the next() argument', function () {
        expect(this.nextSpy).to.have.callCount(1);
      });

      it('should expose the "ts" object in req', function () {
        expect(this.req.ts).to.be.an('object');
        expect(this.req.ts.started.constructor).to.equal(Date);
      });
    });
  });
});

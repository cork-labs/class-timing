'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const tk = require('timekeeper');

const httpTiming = require('../src/index');

describe('httpTiming ()', function () {
  beforeEach(function () {
    this.BASE_DATE = 1330688329321;
    const time = new Date(this.BASE_DATE);
    tk.freeze(time);
  });

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
  });

  describe('middleware api', function () {
    beforeEach(function () {
      this.middleware = httpTiming();
    });

    describe('when the middleware function is invoked', function () {
      beforeEach(function () {
        this.req = {};
        this.res = {};
        this.nextSpy = sinon.spy();
        this.started = new Date();
        this.middleware(this.req, this.res, this.nextSpy);
      });

      it('should invoke the next() argument', function () {
        expect(this.nextSpy).to.have.callCount(1);
      });

      describe('when get() is invoked with no arguments', function () {
        it('should return an object', function () {
          const result = this.req.timing.get();
          expect(result).to.be.an('object');
          expect(result.start.constructor.name).to.equal('Date');
          expect(result.start.getTime()).to.equal(this.started.getTime());
        });
      });

      describe('when get() is invoked with a known key', function () {
        it('should return the timestamp', function () {
          const result = this.req.timing.get('start');
          expect(result.constructor.name).to.equal('Date');
          expect(result.getTime()).to.equal(this.started.getTime());
        });
      });

      describe('when get() is invoked with an unknown key', function () {
        it('should throw an error', function () {
          const fn = () => {
            this.req.timing.get('fo');
          };
          expect(fn).to.throw('Unknown');
        });
      });

      describe('when add() is invoked', function () {
        beforeEach(function () {
          tk.travel(new Date(this.BASE_DATE + 1));
          this.req.timing.add('foo');
        });

        it('should store the timestamp', function () {
          const result = this.req.timing.get('foo');
          expect(result.constructor.name).to.equal('Date');
          expect(result.getTime()).to.equal(this.started.getTime() + 1);
        });
      });

      describe('elapsed times', function () {
        beforeEach(function () {
          tk.travel(new Date(this.BASE_DATE + 3));
          this.req.timing.add('foo');
          tk.travel(new Date(this.BASE_DATE + 5));
          this.req.timing.add('bar');
        });

        describe('when elapsed() is invoked', function () {
          it('should return the elapsed times', function () {
            const result = this.req.timing.elapsed();
            console.log(result);
            expect(result).to.be.an('object');
            expect(result.foo).to.equal(3);
            expect(result.bar).to.equal(2);
            expect(result.total).to.equal(5);
          });
        });

        describe('when total() is invoked', function () {
          it('should return total elapsed toime', function () {
            const result = this.req.timing.total();
            expect(result).to.equal(5);
          });
        });

        describe('when from() is invoked with a known key', function () {
          it('should return the elapsed time', function () {
            const result = this.req.timing.from('foo');
            expect(result).to.equal(2);
          });
        });

        describe('when from() is invoked with an unknown key', function () {
          it('should throw an error', function () {
            const fn = () => {
              this.req.timing.from('baz');
            };
            expect(fn).to.throw('Unknown');
          });
        });

        describe('when of() is invoked with a known key', function () {
          it('should return the elapsed time', function () {
            const result = this.req.timing.of('foo');
            expect(result).to.equal(3);
          });
        });

        describe('when of() is invoked with an unknown key', function () {
          it('should throw an error', function () {
            const fn = () => {
              this.req.timing.of('baz');
            };
            expect(fn).to.throw('Unknown');
          });
        });

        describe('when until() is invoked with a known key', function () {
          it('should return the elapsed time', function () {
            const result = this.req.timing.until('bar');
            expect(result).to.equal(5);
          });
        });

        describe('when until() is invoked with an unknown key', function () {
          it('should throw an error', function () {
            const fn = () => {
              this.req.timing.until('baz');
            };
            expect(fn).to.throw('Unknown');
          });
        });
      });
    });
  });
});

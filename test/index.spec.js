'use strict';

const chai = require('chai');
const expect = chai.expect;
const tk = require('timekeeper');

const Timing = require('../src/index');

describe('Timing', function () {
  beforeEach(function () {
    this.BASE_DATE = 1330688329321;
    const time = new Date(this.BASE_DATE);
    this.started = time;
    tk.freeze(time);
  });

  it('should be a function', function () {
    expect(Timing).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.timing = new Timing();
    });

    describe('when get() is invoked with no arguments', function () {
      it('should return an object', function () {
        const result = this.timing.get();
        expect(result).to.be.an('object');
        expect(result.start.constructor.name).to.equal('Date');
        expect(result.start.getTime()).to.equal(this.started.getTime());
      });
    });

    describe('when get() is invoked with a known key', function () {
      it('should return the timestamp', function () {
        const result = this.timing.get('start');
        expect(result.constructor.name).to.equal('Date');
        expect(result.getTime()).to.equal(this.started.getTime());
      });
    });

    describe('when get() is invoked with an unknown key', function () {
      it('should throw an error', function () {
        const fn = () => {
          this.timing.get('fo');
        };
        expect(fn).to.throw('Unknown');
      });
    });

    describe('when add() is invoked', function () {
      beforeEach(function () {
        tk.travel(new Date(this.BASE_DATE + 1));
        this.timing.add('foo');
      });

      it('should store the timestamp', function () {
        const result = this.timing.get('foo');
        expect(result.constructor.name).to.equal('Date');
        expect(result.getTime()).to.equal(this.started.getTime() + 1);
      });
    });

    describe('elapsed times', function () {
      beforeEach(function () {
        tk.travel(new Date(this.BASE_DATE + 3));
        this.timing.add('foo');
        tk.travel(new Date(this.BASE_DATE + 5));
        this.timing.add('bar');
      });

      describe('when elapsed() is invoked', function () {
        it('should return the elapsed times', function () {
          const result = this.timing.elapsed();
          expect(result).to.be.an('object');
          expect(result.foo).to.equal(3);
          expect(result.bar).to.equal(2);
          expect(result.total).to.equal(5);
        });
      });

      describe('when total() is invoked', function () {
        it('should return total elapsed toime', function () {
          const result = this.timing.total();
          expect(result).to.equal(5);
        });
      });

      describe('when from() is invoked with a known key', function () {
        it('should return the elapsed time', function () {
          const result = this.timing.from('foo');
          expect(result).to.equal(2);
        });
      });

      describe('when from() is invoked with an unknown key', function () {
        it('should throw an error', function () {
          const fn = () => {
            this.timing.from('baz');
          };
          expect(fn).to.throw('Unknown');
        });
      });

      describe('when of() is invoked with a known key', function () {
        it('should return the elapsed time', function () {
          const result = this.timing.of('foo');
          expect(result).to.equal(3);
        });
      });

      describe('when of() is invoked with an unknown key', function () {
        it('should throw an error', function () {
          const fn = () => {
            this.timing.of('baz');
          };
          expect(fn).to.throw('Unknown');
        });
      });

      describe('when until() is invoked with a known key', function () {
        it('should return the elapsed time', function () {
          const result = this.timing.until('bar');
          expect(result).to.equal(5);
        });
      });

      describe('when until() is invoked with an unknown key', function () {
        it('should throw an error', function () {
          const fn = () => {
            this.timing.until('baz');
          };
          expect(fn).to.throw('Unknown');
        });
      });
    });
  });
});

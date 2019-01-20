import * as chai from 'chai';
import 'mocha';
import sinonChai from 'sinon-chai';

const tk = require('timekeeper');

const expect = chai.expect;
chai.use(sinonChai);

import { Timing } from './timing';

describe('Timing', function t () {
  beforeEach(function t () {
    const base = 1330688329321;
    this.BASE_DATE = base;
    const time = new Date(this.BASE_DATE);
    this.started = time;
    tk.freeze(time);
  });

  it('should be a function', function t () {
    expect(Timing).to.be.a('function');
  });

  describe('when get() is invoked with no arguments', function t () {
    beforeEach(function t () {
      this.timing = new Timing();
    });

    it('should return an object', function t () {
      const result = this.timing.get();
      expect(result).to.be.an('object');
      expect(result.start).to.be.a('number');
    });
  });

  describe('when get() is invoked with a known key', function t () {
    beforeEach(function t () {
      this.timing = new Timing();
    });

    it('should return the timestamp', function t () {
      const result = this.timing.get('start');
      expect(result).to.be.a('number');
      expect(result).to.equal(this.started.getTime());
    });
  });

  describe('when get() is invoked with an unknown key', function t () {
    beforeEach(function t () {
      this.timing = new Timing();
    });

    it('should throw an error', function t () {
      const fn = () => {
        this.timing.get('fo');
      };
      expect(fn).to.throw('Unknown');
    });
  });

  describe('when add() is invoked', function t () {
    beforeEach(function t () {
      this.timing = new Timing();
      tk.travel(new Date(this.BASE_DATE + 1));
      this.timing.add('foo');
    });

    it('should store the timestamp', function t () {
      const result = this.timing.get('foo');
      expect(result).to.be.a('number');
      expect(result).to.equal(this.started.getTime() + 1);
    });
  });

  describe('when add() is invoked with the start key', function t () {
    beforeEach(function t () {
      this.timing = new Timing(undefined, 'started');
      this.fn = () => {
        this.timing.add('started');
      };
    });

    it('should throw an error', function t () {
      expect(this.fn).to.throw('Duplicate');
    });
  });

  describe('when add() is invoked with a duplicate key', function t () {
    beforeEach(function t () {
      this.timing = new Timing();
      this.fn = () => {
        this.timing.add('foo');
        this.timing.add('foo');
      };
    });

    it('should throw an error', function t () {
      expect(this.fn).to.throw('Duplicate');
    });
  });

  describe('when add() is invoked with the total key', function t () {
    beforeEach(function t () {
      this.timing = new Timing(undefined, undefined, 'totale');
      this.fn = () => {
        this.timing.add('totale');
      };
    });

    it('should throw an error', function t () {
      expect(this.fn).to.throw('Reserved');
    });
  });

  describe('elapsed times', function t () {
    beforeEach(function t () {
      this.timing = new Timing();

      const elapsedPre = 1;
      const elapsedFoo = 10;
      const elapsedBar = 100;
      const elapsedPost = 1000;

      this.elapsedPre = elapsedPre;
      this.elapsedBar = elapsedBar;
      this.elapsedFoo = elapsedFoo;
      this.elapsedPost = elapsedPost;
      this.elapsedTotal = elapsedPre + elapsedFoo + elapsedBar + elapsedPost;

      tk.travel(new Date(this.BASE_DATE + elapsedPre));
      this.timing.add('pre');

      tk.travel(new Date(this.BASE_DATE + elapsedPre + elapsedFoo));
      this.timing.add('foo');

      tk.travel(new Date(this.BASE_DATE + elapsedPre + elapsedFoo + elapsedBar));
      this.timing.add('bar');

      tk.travel(new Date(this.BASE_DATE + elapsedPre + elapsedFoo + elapsedBar + elapsedPost));
      this.timing.add('post');
    });

    describe('when data() is invoked', function t () {
      it('should return the elapsed times', function t () {
        const result = this.timing.data();
        expect(result).to.be.an('object');
        expect(result.pre).to.equal(this.elapsedPre);
        expect(result.foo).to.equal(this.elapsedFoo);
        expect(result.bar).to.equal(this.elapsedBar);
        expect(result.post).to.equal(this.elapsedPost);
        expect(result.total).to.equal(this.elapsedTotal);
      });
    });

    describe('when total() is invoked', function t () {
      it('should return total elapsed toime', function t () {
        const result = this.timing.total();
        expect(result).to.equal(this.elapsedTotal);
      });
    });

    describe('when from() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = this.timing.from('foo');
        expect(result).to.equal(this.elapsedBar + this.elapsedPost);
      });
    });

    describe('when from() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          this.timing.from('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });

    describe('when of() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = this.timing.of('foo');
        expect(result).to.equal(this.elapsedFoo);
      });
    });

    describe('when of() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          this.timing.of('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });

    describe('when until() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = this.timing.until('bar');
        expect(result).to.equal(this.elapsedPre + this.elapsedFoo + this.elapsedBar);
      });
    });

    describe('when until() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          this.timing.until('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });
  });
});

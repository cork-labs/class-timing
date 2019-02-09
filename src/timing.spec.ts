import * as chai from 'chai';
import 'mocha';
import sinonChai from 'sinon-chai';

import * as tk from 'timekeeper';

const expect = chai.expect;
chai.use(sinonChai);

import { Timing } from './timing';

describe('Timing', function t () {
  let subject: Timing;
  const BASE_DATE = 1330688329321;
  let started: number;

  beforeEach(function t () {
    const time = new Date(BASE_DATE);
    started = time.valueOf();
    tk.freeze(time);
  });

  describe('when start is evaluated', function t () {
    beforeEach(function t () {
      subject = new Timing();
    });

    it('should evaluate to number', function t () {
      const result = subject.start;
      expect(result).to.be.an('number');
    });

    it('should evaluate to the start time', function t () {
      const result = subject.start;
      expect(result).to.equal(started);
    });
  });

  describe('when times is evaluated', function t () {
    beforeEach(function t () {
      subject = new Timing();
    });

    it('should evaluate to object', function t () {
      const result = subject.times;
      expect(result).to.be.an('object');
    });

    it('should contain the start time', function t () {
      const result = subject.times;
      expect(result.start).to.be.a('number');
    });
  });

  describe('when get() is invoked with a known key', function t () {
    beforeEach(function t () {
      subject = new Timing();
    });

    it('should return the expected timestamp', function t () {
      const result = subject.get('start');
      expect(result).to.be.a('number');
      expect(result).to.equal(started);
    });
  });

  describe('when get() is invoked with an unknown key', function t () {
    beforeEach(function t () {
      subject = new Timing();
    });

    it('should throw an error', function t () {
      const fn = () => {
        subject.get('fo');
      };
      expect(fn).to.throw('Unknown');
    });
  });

  describe('when add() is invoked', function t () {
    beforeEach(function t () {
      subject = new Timing();
      tk.travel(new Date(BASE_DATE + 1));
      subject.add('foo');
    });

    it('should store the timestamp', function t () {
      const result = subject.get('foo');
      expect(result).to.be.a('number');
      expect(result).to.equal(started + 1);
    });
  });

  describe('when add() is invoked with the start key', function t () {
    let fn: () => void;

    beforeEach(function t () {
      subject = new Timing(undefined, 'started');
      fn = () => {
        subject.add('started');
      };
    });

    it('should throw an error', function t () {
      expect(fn).to.throw('Duplicate');
    });
  });

  describe('when add() is invoked with a duplicate key', function t () {
    let fn: () => void;

    beforeEach(function t () {
      subject = new Timing();
      fn = () => {
        subject.add('foo');
        subject.add('foo');
      };
    });

    it('should throw an error', function t () {
      expect(fn).to.throw('Duplicate');
    });
  });

  describe('when add() is invoked with the total key', function t () {
    let fn: () => void;

    beforeEach(function t () {
      subject = new Timing(undefined, undefined, 'totale');
      fn = () => {
        subject.add('totale');
      };
    });

    it('should throw an error', function t () {
      expect(fn).to.throw('Reserved');
    });
  });

  describe('given some times added', function t () {
    const elapsedPre = 1;
    const elapsedFoo = 10;
    const elapsedBar = 100;
    const elapsedPost = 1000;
    const elapsedTotal = elapsedPre + elapsedFoo + elapsedBar + elapsedPost;

    beforeEach(function t () {
      subject = new Timing();

      tk.travel(new Date(BASE_DATE + elapsedPre));
      subject.add('pre');

      tk.travel(new Date(BASE_DATE + elapsedPre + elapsedFoo));
      subject.add('foo');

      tk.travel(new Date(BASE_DATE + elapsedPre + elapsedFoo + elapsedBar));
      subject.add('bar');

      tk.travel(new Date(BASE_DATE + elapsedPre + elapsedFoo + elapsedBar + elapsedPost));
      subject.add('post');
    });

    describe('when data() is invoked', function t () {
      it('should return the elapsed times', function t () {
        const result = subject.data();
        expect(result).to.be.an('object');
        expect(result.pre).to.equal(elapsedPre);
        expect(result.foo).to.equal(elapsedFoo);
        expect(result.bar).to.equal(elapsedBar);
        expect(result.post).to.equal(elapsedPost);
        expect(result.total).to.equal(elapsedTotal);
      });
    });

    describe('when total() is invoked', function t () {
      it('should return total elapsed toime', function t () {
        const result = subject.total();
        expect(result).to.equal(elapsedTotal);
      });
    });

    describe('when from() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = subject.from('foo');
        expect(result).to.equal(elapsedBar + elapsedPost);
      });
    });

    describe('when from() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          subject.from('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });

    describe('when of() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = subject.of('foo');
        expect(result).to.equal(elapsedFoo);
      });
    });

    describe('when of() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          subject.of('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });

    describe('when until() is invoked with a known key', function t () {
      it('should return the elapsed time', function t () {
        const result = subject.until('bar');
        expect(result).to.equal(elapsedPre + elapsedFoo + elapsedBar);
      });
    });

    describe('when until() is invoked with an unknown key', function t () {
      it('should throw an error', function t () {
        const fn = () => {
          subject.until('baz');
        };
        expect(fn).to.throw('Unknown');
      });
    });
  });
});

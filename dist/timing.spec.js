"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
require("mocha");
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const tk = require('timekeeper');
const expect = chai.expect;
chai.use(sinon_chai_1.default);
const timing_1 = require("./timing");
describe('Timing', function t() {
    beforeEach(function t() {
        const base = 1330688329321;
        this.BASE_DATE = base;
        const time = new Date(this.BASE_DATE);
        this.started = time;
        tk.freeze(time);
    });
    it('should be a function', function t() {
        expect(timing_1.Timing).to.be.a('function');
    });
    describe('when get() is invoked with no arguments', function t() {
        beforeEach(function t() {
            this.timing = new timing_1.Timing();
        });
        it('should return an object', function t() {
            const result = this.timing.get();
            expect(result).to.be.an('object');
            expect(result.start).to.be.a('number');
        });
    });
    describe('when get() is invoked with a known key', function t() {
        beforeEach(function t() {
            this.timing = new timing_1.Timing();
        });
        it('should return the timestamp', function t() {
            const result = this.timing.get('start');
            expect(result).to.be.a('number');
            expect(result).to.equal(this.started.getTime());
        });
    });
    describe('when get() is invoked with an unknown key', function t() {
        beforeEach(function t() {
            this.timing = new timing_1.Timing();
        });
        it('should throw an error', function t() {
            const fn = () => {
                this.timing.get('fo');
            };
            expect(fn).to.throw('Unknown');
        });
    });
    describe('when add() is invoked', function t() {
        beforeEach(function t() {
            this.timing = new timing_1.Timing();
            tk.travel(new Date(this.BASE_DATE + 1));
            this.timing.add('foo');
        });
        it('should store the timestamp', function t() {
            const result = this.timing.get('foo');
            expect(result).to.be.a('number');
            expect(result).to.equal(this.started.getTime() + 1);
        });
    });
    describe('elapsed times', function t() {
        beforeEach(function t() {
            this.timing = new timing_1.Timing();
            const elapsedFoo = 33;
            const elapsedBar = 42;
            this.elapsedFoo = elapsedFoo;
            tk.travel(new Date(this.BASE_DATE + this.elapsedFoo));
            this.timing.add('foo');
            this.elapsedBar = elapsedBar;
            tk.travel(new Date(this.BASE_DATE + this.elapsedFoo + this.elapsedBar));
            this.timing.add('bar');
            this.elapsedTotal = this.elapsedFoo + this.elapsedBar;
        });
        describe('when elapsed() is invoked', function t() {
            it('should return the elapsed times', function t() {
                const result = this.timing.elapsed();
                expect(result).to.be.an('object');
                expect(result.foo).to.equal(this.elapsedFoo);
                expect(result.bar).to.equal(this.elapsedBar);
                expect(result.total).to.equal(this.elapsedTotal);
            });
        });
        describe('when total() is invoked', function t() {
            it('should return total elapsed toime', function t() {
                const result = this.timing.total();
                expect(result).to.equal(this.elapsedTotal);
            });
        });
        describe('when from() is invoked with a known key', function t() {
            it('should return the elapsed time', function t() {
                const result = this.timing.from('foo');
                expect(result).to.equal(this.elapsedBar);
            });
        });
        describe('when from() is invoked with an unknown key', function t() {
            it('should throw an error', function t() {
                const fn = () => {
                    this.timing.from('baz');
                };
                expect(fn).to.throw('Unknown');
            });
        });
        describe('when of() is invoked with a known key', function t() {
            it('should return the elapsed time', function t() {
                const result = this.timing.of('foo');
                expect(result).to.equal(this.elapsedFoo);
            });
        });
        describe('when of() is invoked with an unknown key', function t() {
            it('should throw an error', function t() {
                const fn = () => {
                    this.timing.of('baz');
                };
                expect(fn).to.throw('Unknown');
            });
        });
        describe('when until() is invoked with a known key', function t() {
            it('should return the elapsed time', function t() {
                const result = this.timing.until('bar');
                expect(result).to.equal(this.elapsedFoo + this.elapsedBar);
            });
        });
        describe('when until() is invoked with an unknown key', function t() {
            it('should throw an error', function t() {
                const fn = () => {
                    this.timing.until('baz');
                };
                expect(fn).to.throw('Unknown');
            });
        });
    });
});
//# sourceMappingURL=timing.spec.js.map
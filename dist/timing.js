"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timing {
    constructor(date, startingKey = 'start', totalKey = 'total') {
        this.totalKey = totalKey;
        this.ts = {};
        this.seq = [startingKey];
        this.ts[startingKey] = date || Date.now();
    }
    get(key) {
        if (!key) {
            return Object.assign({}, this.ts);
        }
        else if (!this.ts[key]) {
            throw new Error(`Unknown timestamp "${key}".`);
        }
        return this.ts[key];
    }
    add(key, date) {
        this.seq.push(key);
        this.ts[key] = date || Date.now();
    }
    elapsed() {
        return this.seq.reduce((acc, item, index) => {
            acc[this.totalKey] = acc[this.totalKey] || 0;
            if (index) {
                const prevKey = this.seq[index - 1];
                const currentKey = this.seq[index];
                const elapsed = this.ts[currentKey] - this.ts[prevKey];
                acc[currentKey] = elapsed;
                acc[this.totalKey] += elapsed;
            }
            return acc;
        }, {});
    }
    total() {
        const last = this.seq[this.seq.length - 1];
        const firstKey = this.seq[0];
        return this.ts[last] - this.ts[firstKey];
    }
    from(key) {
        if (!this.ts[key]) {
            throw new Error(`Unknown timestamp "${key}".`);
        }
        const lastKey = this.seq[this.seq.length - 1];
        return this.ts[lastKey] - this.ts[key];
    }
    of(key) {
        if (!this.ts[key]) {
            throw new Error(`Unknown timestamp "${key}".`);
        }
        const index = this.seq.indexOf(key);
        const prevKey = this.seq[index - 1];
        return this.ts[key] - this.ts[prevKey];
    }
    until(key) {
        if (!this.ts[key]) {
            throw new Error(`Unknown timestamp "${key}".`);
        }
        const firstKey = this.seq[0];
        return this.ts[key] - this.ts[firstKey];
    }
}
exports.Timing = Timing;
//# sourceMappingURL=timing.js.map
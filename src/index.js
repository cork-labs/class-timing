'use strict';

class Timing {
  constructor (startingKey = 'start', totalKey = 'total') {
    this._totalKey = totalKey;
    this._ts = {};
    this._seq = [startingKey];
    this._ts[startingKey] = new Date();
  }

  get (key) {
    if (!key) {
      return Object.assign({}, this._ts);
    } else if (!this._ts[key]) {
      throw new Error(`Unknown timestamp "${key}".`);
    }
    return this._ts[key];
  }

  add (key) {
    this._seq.push(key);
    this._ts[key] = new Date();
  }

  elapsed () {
    return this._seq.reduce((acc, item, index) => {
      acc[this._totalKey] = acc[this._totalKey] || 0;
      if (index) {
        const prevKey = this._seq[index - 1];
        const currentKey = this._seq[index];
        const elapsed = this._ts[currentKey] - this._ts[prevKey];
        acc[currentKey] = elapsed;
        acc[this._totalKey] += elapsed;
      }
      return acc;
    }, {});
  }

  total () {
    const last = this._seq[this._seq.length - 1];
    const firstKey = this._seq[0];
    return this._ts[last] - this._ts[firstKey];
  }

  from (key) {
    if (!this._ts[key]) {
      throw new Error(`Unknown timestamp "${key}".`);
    }
    const lastKey = this._seq[this._seq.length - 1];
    return this._ts[lastKey] - this._ts[key];
  }

  of (key) {
    if (!this._ts[key]) {
      throw new Error(`Unknown timestamp "${key}".`);
    }
    const index = this._seq.indexOf(key);
    const prevKey = this._seq[index - 1];
    return this._ts[key] - this._ts[prevKey];
  }

  until (key) {
    if (!this._ts[key]) {
      throw new Error(`Unknown timestamp "${key}".`);
    }
    const firstKey = this._seq[0];
    return this._ts[key] - this._ts[firstKey];
  }
}

module.exports = Timing;

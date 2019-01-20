import { ITimingData } from './interfaces/timing-data';

export class Timing {

  private startingKey: string;
  private totalKey: string;
  private ts: { [key: string]: number };
  private seq: string[];

  constructor (date?: number, startingKey: string = 'start', totalKey: string = 'total') {
    this.startingKey = startingKey;
    this.totalKey = totalKey;
    this.ts = {};
    this.seq = [startingKey];
    this.ts[startingKey] = date || Date.now();
  }

  public get (key: string) {
    if (!key) {
      return Object.assign({}, this.ts);
    } else if (!this.ts[key]) {
      throw new Error(`Unknown key "${key}".`);
    }
    return this.ts[key];
  }

  public add (key: string, date?: number) {
    if (this.ts[key]) {
      throw new Error(`Duplicate key "${key}".`);
    }
    if (key === this.totalKey) {
      throw new Error(`Reserved key "${key}".`);
    }
    this.seq.push(key);
    this.ts[key] = date || Date.now();
  }

  public data (): ITimingData {
    const data: ITimingData = {};
    data[this.startingKey] = this.ts[this.seq[0]],
    data[this.totalKey] = 0;
    return this.seq.reduce((acc: any, item: any, index: number) => {
      if (index) {
        const prevKey = this.seq[index - 1];
        const currentKey = this.seq[index];
        const elapsed = this.ts[currentKey] - this.ts[prevKey];
        acc[currentKey] = elapsed;
        acc[this.totalKey] += elapsed;
      }
      return acc;
    }, data);
  }

  public total (): number {
    const last = this.seq[this.seq.length - 1];
    const firstKey = this.seq[0];
    return this.ts[last] - this.ts[firstKey];
  }

  public from (key: string): number {
    if (!this.ts[key]) {
      throw new Error(`Unknown key "${key}".`);
    }
    const lastKey = this.seq[this.seq.length - 1];
    return this.ts[lastKey] - this.ts[key];
  }

  public of (key: string): number {
    if (!this.ts[key]) {
      throw new Error(`Unknown key "${key}".`);
    }
    const index = this.seq.indexOf(key);
    const prevKey = this.seq[index - 1];
    return this.ts[key] - this.ts[prevKey];
  }

  public until (key: string): number {
    if (!this.ts[key]) {
      throw new Error(`Unknown key "${key}".`);
    }
    const firstKey = this.seq[0];
    return this.ts[key] - this.ts[firstKey];
  }
}

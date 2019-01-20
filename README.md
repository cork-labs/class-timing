# Timing

> Node.js class, captures timestamps, exposes elapsed times.


## Getting Started

```shell
npm install --save @cork-labs/class-timing
```

```javascript
const Timing = require('@cork-labs/class-timing');

const time = new Timing('start');
setTimeout(() => time.add('mark1'), 1000);
setTimeout(() => time.add('mark2'), 1500);
setTimeout(() => console.log(timing.elapsed()), 2000) // elapsed times { mark1: 1000, mark2: 500, total: 1500 }
setTimeout(() => {
  console.log(time.from('mark1')); // 500
  console.log(time.of('mark2')); // 500
  console.log(time.until('mark2')); // 1500
  console.log(time.total()); // 1500
}, 3000);
```


## API

### Timing

#### `new Timing(date, startingKey, totalKey): Timing`

Creates an instance of `Timing`, optionally customising the `start` and `total` keys.

- `date?: number` - defaults to `Date.now()`
- `startKey?: string` - defaults to `'start'`
- `totalKey?:string ` - defaults to `'total'`

```javascript
const timing = new Timing();
const timing = new Timing(someTimestamp, 'started', 'elapsed');
```

#### `timing.add(key)`

Stores a timestamp with the provided key.

Throws an error if key is already added or equals the `startKey` or `totalKey`.

```javascript
timing.add('render');
```
#### `timing.get()`

Returns the stored timestamps as key/values.

Throws an error if key is unknown.

```javascript
timing.get(); // { start: 1547997598940, render: 1547997598941, output: 1547997598942 }
```

#### `timing.get(key)`

Returns only the specified timestamp.

Throws an error if key is unknown.

```javascript
timing.get('start');
```

#### `timing.data(): ITimingData`

Returns all the elapsed times, in miliseconds, between timestamps.

Additionaly, the following keys are included:
  - `startingKey` - the initial timestamp
  - `totalKey` - total time elapsed in miliseconds

```javascript
timing.add('route');
timing.add('process');
timing.add('render');
timing.add('output');
timing.data(); // { start: 1547997598940, route: 1, process: 5, render: 2, output: 1, total: 9 }
```

#### `timing.total(): number`

Elapsed time since instantiated, in miliseconds.

```javascript
timing.total(); // 9
```
#### `timing.from(key): number`

Elapsed time since timestamp was added, in miliseconds.

```javascript
timing.from('process'); // 3
```

#### `timing.of(key): number`

Elapsed time between the previous timestamp and the specified one, in miliseconds.
```javascript
timing.of('process'); // 5
```

#### `timing.until(key): number`

Elapsed time since instantiation until timestamp, in miliseconds.
```javascript
timing.until('process'); // 6
```


## Development

### Install dependencies

```
npm install -g nodemon npm-bump
```

### Code, test, publish

#### VSCode launchers:
- `test` - run tests once

#### NPM scripts:
- `npm run dev` - run tests (restarts when files saved)
- `npm run lint` - lint
- `npm run lint-fix` - lint and fix
- `npm test` - run all test suites and produce code coverage reports
- `npm run test-u` - run unit tests
- `npm run test-i` - run integration tests
- `npm run coverage` - serve test coverage reports
- `npm run clean` - delete all build artifacts
- `npm run build` - lint and test
- `npm run pub` - publish a patch version (use `npm-bump minor` to publish a minor version)


### Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Check [CONTRIBUTING](https://github.com/cork-labs/contributing/blob/master/CONTRIBUTING.md) before submitting issues and PRs.


## Links

- [ts-node](https://www.npmjs.com/package/ts-node)
- [nyc](https://github.com/istanbuljs/nyc)
- [mocha](https://github.com/mochajs/mocha)
- [chai](https://github.com/chaijs/chai)
- [sinon](http://sinonjs.org/)
- [sinon-chai](https://github.com/domenic/sinon-chai)
- [npm-bump](https://www.npmjs.com/package/npm-bump)


## [MIT License](LICENSE)

[Copyright (c) 2019 Cork Labs](http://cork-labs.mit-license.org/2019)

# Classes Timing

> Pure class, captures timestamps, exposes elapsed times.


## Getting Started

```shell
npm install --save @cork-labs/classes-timing
```

```javascript
const Timing = require('@cork-labs/classes-timing');

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

### new Timing([startKey [, totalKey]])

Creates an instance of `Timing`, optionally customising the `start` and `total` keys.

- `startKey` - defaults to `'start'`
- `totalKey` - defaults to `'total'`

```javascript
const timing = new Timing('started', 'elapsed');
```

### timing.add(key)

Stores a timestamp with the provided key.

If key is already added or equals the `startKey` or `totalKey` it will throw an error.

```javascript
timing.add('render');
```
### timing.get()

Returns the stored timestamps as key/values.

```javascript
timing.get(); // { start: Date, render: Date, output: Date }
```

### timing.get(key)

Returns only the specified timestamp.

If the key is unknown, it throws an error.

```javascript
timing.get('start');
```

### timing.elapsed()

Returns all the elapsed times, in miliseconds, between timestamps.

AThe additional `total` key is returned with the total time elapsed in miliseconds.

```javascript
timing.elapsed(); // { route: 1, process: 5, render: 2, output: 1, total: 9 }
```

### timing.total()

Elapsed time since instantiated, in miliseconds.

```javascript
timing.total(); // 9
```
### timing.from(key)

Elapsed time since timestamp was added, in miliseconds.

```javascript
timing.from('process'); // 3
```

### timing.of(key)

Elapsed time between the previous timestamp and the specified one, in miliseconds.
```javascript
timing.of('process'); // 5
```

### timing.until(key)

Elapsed time since instantiation until timestamp, in miliseconds.
```javascript
timing.until('process'); // 6
```


## Develop

```shell
# lint and fix
npm run lint

# run test suite
npm test

# lint and test
npm run build

# serve test coverage
npm run coverage

# publish a minor version
node_modules/.bin/npm-bump minor
```

### Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Check [CONTRIBUTING](https://github.com/cork-labs/contributing/blob/master/CONTRIBUTING.md) before submitting issues and PRs.


## Tools

- [npm-bump](https://www.npmjs.com/package/npm-bump)
- [timekeeper](https://github.com/vesln/timekeeper)
- [chai](http://chaijs.com/api/)
- [sinon](http://sinonjs.org/)
- [sinon-chai](https://github.com/domenic/sinon-chai)


## [MIT License](LICENSE)

[Copyright (c) 2018 Cork Labs](http://cork-labs.mit-license.org/2018)

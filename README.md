# HTTP Middleware Timing

> Express middleware, captures request elapsed time(s)`.


## Getting Started

```shell
npm install --save @cork-labs/http-middleware-timing
```

```javascript
// your application setup
const httpTiming = require('@cork-labs/http-middleware-timing');
app.use(httpTiming());

// your route
app.get('/path', (req, res, next) => {
  console.log(req.elapsed()); // miliseconds since request was first processed
})
```


## API


### req.timing.add(key)

Stores a timestamp with the provided key.

The key `total` is reserved and will throw an error if used.

```javascript
req.timing.add('render');
```
### req.timing.get()

Returns the stored timestamps as key/values.

```javascript
req.timing.get(); // { start: Date, render: Date, output: Date }
```

### req.timing.get(key)

Returns only the specified timestamp.

If the key is unkmnown, it will throw an error.

```javascript
req.timing.get('start');
```

### req.timing.elapsed()

Returns all the elapsed times, in miliseconds, between timestamps.

An additional `total` key is returned with the total time elapsed in miliseconds.

```javascript
req.timing.elapsed(); // { route: 1, process: 5, render: 2, output: 1, total: 9 }
```

### req.timing.total()

Elapsed time since request was first processed, in miliseconds.

```javascript
req.timing.total(); // 9
```
### req.timing.from(key)

Elapsed time since timestamp was added, in miliseconds.

```javascript
req.from('process'); // 3
```

### req.timing.of(key)

Elapsed time between the previous timestamp and the specified one, in miliseconds.
```javascript
req.of('process'); // 5
```

### req.timing.until(key)

Elapsed time since request first processed until timestamp, in miliseconds.
```javascript
req.until('process'); // 6
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

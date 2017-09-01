# valueless

> Replace values with paths, for use in test fixtures

[![NPM version](http://img.shields.io/npm/v/valueless.svg?style=flat-square)](https://www.npmjs.com/package/valueless)
[![NPM downloads](http://img.shields.io/npm/dm/valueless.svg?style=flat-square)](https://www.npmjs.com/package/valueless)
[![Dependency Status](http://img.shields.io/david/JamieMason/valueless.svg?style=flat-square)](https://david-dm.org/JamieMason/valueless)
[![Gitter Chat for valueless](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/valueless)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Donate via Gratipay](https://img.shields.io/gratipay/user/JamieMason.svg)](https://gratipay.com/~JamieMason/)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/valueless?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## Installation

```
npm install --save-dev valueless
```

## Usage

### Node.js

```js
import valueless from 'valueless';

valueless({ foo: [true], bar: [{ baz: null }] });
// => { bar: [{ baz: 'bar.0.baz' }], foo: ['foo.0'] }
```

### Command Line

```
echo '[["ivo"],["marloes"]]' | valueless
```

outputs

```json
[["0.0"],["1.0"]]
```

## Background

Not a common use-case _at all_, but created to see if it could reduce some of the overhead we have
when managing test fixtures for JSON returned by [contentstack](https://contentstack.built.io),
which we are transforming using [reselect](https://github.com/reactjs/reselect).

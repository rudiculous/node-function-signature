# node-function-signature

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Parses a function to get its parameters.

##  Installation
`npm install @rdcl/function-signature`

## Usage
```javascript
var getFunctionSignature = require('@rdcl/function-signature');
var signature = getFunctionSignature(function (foo, bar, baz) { /* ... */ });
```

Output should be `['foo', 'bar', 'baz']`.

## Tests
`npm test`


[npm-image]: https://img.shields.io/npm/v/@rdcl/function-signature.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@rdcl/function-signature
[travis-image]: https://img.shields.io/travis/rudiculous/node-function-signature/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/rudiculous/node-function-signature
[coveralls-image]: https://img.shields.io/coveralls/rudiculous/node-function-signature/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/rudiculous/node-function-signature?branch=master

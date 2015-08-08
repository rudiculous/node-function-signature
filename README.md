# node-function-signature

[![Build Status](https://travis-ci.org/rudiculous/node-function-signature.svg?branch=master)](https://travis-ci.org/rudiculous/node-function-signature)
[![Coverage Status](https://coveralls.io/repos/rudiculous/node-function-signature/badge.svg?branch=master&service=github)](https://coveralls.io/github/rudiculous/node-function-signature?branch=master)

Parses a function to get its parameters.

##  Installation
  `npm install @rdcl/function-signature`

## Usage
    var getFunctionSignature = require('@rdcl/function-signature');
    var signature = getFunctionSignature(function (foo, bar, baz) { /* ... */ });

Output should be `['foo', 'bar', 'baz']`.

## Tests
  `npm test`

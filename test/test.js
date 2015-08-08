"use strict";

var expect = require('chai').expect;
var getFunctionSignature = require('..');

describe('#getFunctionSignature', function () {
    it('should return an empty array when passed a function without arguments', function () {
        var fn = function () {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal([]);
    });

    it('should return a list of argument names', function () {
        var fn = function (foo, bar, baz) {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal(['foo', 'bar', 'baz']);
    });

    it('should ignore whitespace', function () {
        var fn = function (
            foo,
			bar ,
            baz
            ,
			qux
        ) {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal(['foo', 'bar', 'baz', 'qux']);
    });

    it('should ignore block comments', function () {
        var fn = function (/* string */ foo) {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal(['foo']);
    });

    it('should ignore line comments', function () {
        var fn = function ( // this is a comment
            foo, // this is another comment
            bar) {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal(['foo', 'bar']);
    });

    it('should correctly handle complex combinations of block and line comments', function () {
        var fn = function ( // this is a comment /*
            foo, /* this is a block comment
            bar, // This is not a block comment */
            baz // This is a line comment */
        ) {};
        var result = getFunctionSignature(fn);

        expect(result).to.deep.equal(['foo', 'baz']);
    });

    it('should throw a TypeError when passed objects without a toString method', function () {
        expect(function () {
            getFunctionSignature(null);
        }).to.throw(TypeError);
    });

    it('should return an empty array when passed an invalid object', function () {
        var result = getFunctionSignature('not a function');

        expect(result).to.deep.equal([]);
    });

    if (testDefaultValues()) {
        it('should ignore default values (if supported)', function () {
            eval('var fn = function (foo = 0, bar = 1) {};');
            var result = getFunctionSignature(fn);

            expect(result).to.deep.equal(['foo', 'bar']);
        });
    }
    else {
        it('should ignore default values (if supported)');
    }

    if (testRestParameters()) {
        it('should ignore rest parameters (if supported)', function () {
            eval('var fn = function (foo, ...bar) {};');
            var result = getFunctionSignature(fn);

            expect(result).to.deep.equal(['foo']);
        });
    }
    else {
        it('should ignore rest parameters (if supported)');
    }
});

function testDefaultValues() {
    return _testWithEval('var fn = function (foo = 0, bar = 1) {};');
}

function testRestParameters() {
    return _testWithEval('var fn = function (foo, ...bar) {};');
}

function _testWithEval(str) {
    try {
        eval('"use strict";\n' + str);

        return true;
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            console.log(err);
            return false;
        }
        else {
            throw err;
        }
    }
}

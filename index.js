'use strict'

/**
 * Parses a function to get its parameters.
 *
 * @param {Function} fn The function to parse.
 * @return {Array} A list of the function arguments.
 *
 * @public
 */
function getFunctionSignature(fn) {
  var str = fn.toString()

  // Strip comments.
  str = str.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, '')

    var match = str.match(/\(([^)]*)\)/)

  if (match) {
    var res = match[1]

    // Strip leading and trailing whitespace.
    res = res.replace(/^\s+|\s+$/g, '')

    var sig = res.split(/\s*,\s*/)

    if (sig.length === 1 && !sig[0]) {
      sig.length = 0
    }

    var signature = []

    for (var key of sig) {
      // TODO: Handle rest parameters. The position of the rest
      // parameter matters, so this requires some thought. The
      // following signatures are all different:
      // * function (...rest, foo, bar)
      // * function (foo, ...rest, bar)
      // * function (foo, bar, ...rest)
      // For now, just ignore rest parameters...
      if (key.indexOf('...') === 0) {
        continue
      }

      // If there is a default value defined, remove it from the
      // key.
      key = key.replace(/\s*=.*$/, '')

      // TODO: Should we do something with destructuring
      // assignments?

      signature.push(key)
    }

    return signature
  }
  else {
    return []
  }
}

exports = module.exports = getFunctionSignature

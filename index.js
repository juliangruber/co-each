
module.exports = each;

/**
 * Parralel forEach for generators.
 *
 * @param {Array} arr
 * @param {Function} fn
 */

function each(arr, fn) {
  return arr.map(function(el, i, all) {
    return fn(el, i, all);
  });
}

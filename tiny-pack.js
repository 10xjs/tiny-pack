/*!
  tiny-pack.js
  2016 Neal Granger
  Licensed under CC0-1.0
*/

/**
 * Pack a grid of rectangles, solving for a specific row as defined by a ratio
 * of the display width. This algorithm is entirely agnostic to actual width
 * and height values. The only inputs are aspect ratios (width/height). All
 * output is returned as values relative to a final width.
 *
 * @param {Number} targetRatio - The desired row height as a ratio of the width.
 * @param {Number[]} ratios - An array of aspect ratios to pack.
 * @returns {Number[]} An array of width factors.
 */
module.exports = function tinyPack(targetRatio, ratios) {
  // Create a new array that can be safely mutated.
  var remaining = ratios.slice();
  var result = [];
  var push = Function.prototype.apply.bind(result.push, result);
  var row = [];

  var r;
  var previous;
  while ((r = r || remaining.shift())) {
    // Add an element to the current row.
    row.push(r);
    r = null;

    // Calculate the "ratio" of the current row. This is the aspect ratio of all
    // of the elements joined together. The goal is for this number to be as
    // close as possible to the target ratio input parameter.
    var ratio = row.reduce(function(a, b) { return a + b; });

    if (ratio > targetRatio) {
      // The ratio is greater than target ratio when the maximum number of
      // elements have been added to the current row.
      if (row.length > 1 && targetRatio / previous < ratio / targetRatio) {
        // If the previous ratio (before the last element was added to the row)
        // is closer to the target ratio then the current ratio, remove the last
        // element and use the previous ratio instead. The last element is
        // stored for the next loop iteration.
        r = row.pop();
        push(row.map(function(r) { return r / previous; }));
      } else {
        // Calculate width percantage values for the elements of the current
        // row and append them to the results array.
        push(row.map(function(r) { return r / ratio; }));
      }
      row = [];
    }

    previous = ratio;
  }

  if (row.length) {
    // Assign width percentage values to the remaining unused elements.
    push(row.map(function(r) { return r / targetRatio; }));
  }

  return result;
};

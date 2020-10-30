/**
 * Pack a grid of rectangles, solving for a specific row as defined by a ratio
 * of the display width. This algorithm is entirely agnostic to actual width
 * and height values. The only inputs are aspect ratios (width/height). All
 * output is returned as scale values relative to an absolute outer width.
 *
 * @param {number} targetRatio - The desired row height as a ratio of the width.
 * @param {number[]} ratios - An array of aspect ratios to pack.
 * @returns {number[]} An array of scale values.
 */
declare function tinyPack(targetRatio: number, ratios: number[]): number[];

export = tinyPack;

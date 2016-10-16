#tiny-pack

Pack a grid of rectangles, solving for a specific row as defined by a ratio of the display width. This algorithm is entirely agnostic to actual width and height values. The only inputs are aspect ratios (width/height). All output is returned as values relative to a final width.

## Installation

```sh
$ npm install tiny-pack
```

## Usage

```js
import tinyPack from 'tiny-pack';

// Start with a set of rectangles. Anything that has a known aspect ratio can be
// used as input.
const rects = [
  {width: 450, height: 400},
  {width: 300, height: 200},
  {width: 500, height: 350},
  {width: 400, height: 350},
  {width: 100, height: 600},
  ...
];

const render = ({rects}) => {
  // Generate an array of aspect ratios (width/height) from the rectangles.
  const ratios = rects.map((element) => element.width / element.height);

  // Define the target ratio for each packed row.
  const targetRatio = 4; // Each row will be 4 units wide and 1 unit high.

  // tinyPack returns an array of width values that, when applied to each input
  // rectangle, will pack them tightly into rows.
  const widths = tinyPack(targetRatio, ratios);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        outline: '1px solid black'
      }}
    >
      {rects.map((rect, i) => {
        return(
          <div
            key={i}
            style={{
              // Using flex-shrink 1 prevents any row with widths that add up to
              // just slightly over 100%, due to floating point inaccuracy, from
              // wrapping to a second row.
              flex: `0 1 ${widths[i] * 100} %`
            }}>
            <div
              style={{
                flex: `0 1 ${width * 100} %`
                outline: '1px solid black',
                outlineOffset: -1,
                // Since padding-bottom is relative to the parent elements width
                // when defined as a percentage, this div will scale with a
                // fixed aspect ratio.
                // see: http://andyshora.com/css-image-container-padding-hack
                paddingBottom: `${100 / ratios[i]}%`
              }}
            >
          </div>
        );
      })}
    </div>
  );
};
```

## Page weight

tinyPack.js is less than 500 bytes when minfied.
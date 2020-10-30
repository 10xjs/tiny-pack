# tiny-pack

An exceptionally small and fast masonry layout resolver.

## Installation

```sh
$ npm install tiny-pack
```

## Features & Behavior

`tiny-pack` resolves a tight grid layout for a set of input elements of varying dimensions. It does not interact directly with the DOM and can be used in any JS environment.

The resolver is agnostic to absolute element and container dimensions, and operates using only _relative_ ratios.

All elements are positioned to have the same height as all other elements within each row. No element can span multiple rows, regardless of how tall and narrow it is.

The resolved layout preserves the aspect ratios of all elements, only scale transformations are necessary to conform the input elements to the layout.

The layout resolver output is a single array of scale values that represent each input element's width _relative_ to the absolute container. It does not return absolute dimensions or coordinates, however, absolute coordinates of each element can be calculated by iterating through the returned scale values.

## Usage

Below is a contrived minimal example that demonstrates creating an HTML layout for a set of input element of known dimensions.

```js
import tinyPack from 'tiny-pack';

// Assuming we have a set of images of known dimensions
const images = [
  {width: 450, height: 400, src: '...'},
  {width: 300, height: 200, src: '...'},
  {width: 500, height: 350, src: '...'},
  {width: 400, height: 350, src: '...'},
  {width: 100, height: 600, src: '...'},
  ...
];

// Generate an array of aspect ratios (width/height) from the input dimensions.
const ratios = images.map((element) => {
  return element.width / element.height;
});

// Define the target ratio for each packed row. Each row will be 4 units wide
// and 1 unit high.
const targetRatio = 4;

// `tiny-pack` returns an array of scale values that, when applied to each input
// element, will pack them tightly into rows.
const scales = tinyPack(targetRatio, ratios);

// Create a container element that left-aligns and wraps all child elements.
const container = document.createElement('div');
document.body.appendChild(container);
container.style.display = 'flex';
container.style.flexWrap = 'flex-wrap';
container.style.outline = '1px solid black';

// Append a img tag for each input image definition and set its width
// (as flex-basis) relative to the parent container.
images.map((image, i) => {
  const img = document.createElement('img');
  container.appendChild(img);

  img.src = image.src;
  img.style.flex = `0 1 ${scales[i] * 100} %`;
});
```

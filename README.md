## @bablr/property-weak-map

A WeakMap-like API to attach metadata to objects using hidden slots

### Usage

Here's how you can use `PropertyWeakMap` to make a simple opaque object type for points:

```js
import { PropertyWeakMap } from 'property-weak-map';

let validPoints = new PropertyWeakMap();

export const buildPoint = (x, y) => {
  let point = Object.create(null);
  point.x = x;
  point.y = y;
  Object.freeze(point);
  validPoints.set(point, true);
  return point;
};

export const isValidPoint = (point) => {
  return validPoints.has(point);
};
```

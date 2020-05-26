# LIT

## Simple library for manipulating array through iterations

You can write

```js
[-5, -4, -3, -2, -1 0, 1, 2, 3, 4, 5]
  .map((item) => item * 2)
  .filer((item) => item > 0)
  .map((item) => item / 2);
```

and don't think about performance, because we thought about it instead of you. 

Instead of run across whole array each time when you use map or filter or etc We apply transducers for every item and run across initial array only once.  
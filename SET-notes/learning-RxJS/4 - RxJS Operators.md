# Introduction

- ### RxJS Operators

  - Overview
  - Documentation
  - Examples
  - Interals

- ### RxJS Features
  - map
  - tap
  - take

<br/>
<br/>

# RxJS Operator Overview

```javascript
of(2, 4, 6)
  .pipe(
    map((item) => item * 2),
    tap((item) => console.log(item)),
    take(2)
  )
  .subscribe(console.log);
```

## Documentation: https://rxjs.dev

- ### Overview
- ### Installation
- ### Reference
- ### **Operator Decision Tree**
- ### External Resources

<br>
<br>

# RxJS Operator: `map`

## Transforms each emitted item

- ### For each item in the source, one mapped item is emitted

- ### Used for
  - Making changes to each item

```javascript
of(2, 4, 6)
  .pipe(
    map((item) => item * 2),
    map((item) => item - 3)
  )
  .subscribe(console.log);

// Stream 1: 2, 4, 6
// Stream 2: 4, 8, 12
// Stream 3: 1, 5, 9
```

<br/>
<br/>

# RxJS Operator: `tap`

## Taps into a stream without modifying it

- ### Used for
  - Debugging
  - Performing actions outside of the flow of data

```javascript
of(2, 4, 6)
  .pipe(
    tap((item) => console.log(item)),
    map((item) => item * 2),
    tap((item) => console.log(item)),
    map((item) => item - 3),
    tap((item) => console.log(item))
  )
  .subscribe();

// 2 4 1 4 8 5 6 12 9
```

<br>
<br>

# RxJS Operator: `take`

## Emits a specified number of items

- ### Used for
  - Taking a specified number of itesm
  - Limiting unlimited streams

```javascript
of(2, 4, 6)
  .pipe(
    tap((item) => console.log(item)),
    map((item) => item * 2),
    take(2),
    map((item) => item - 3),
    tap((item) => console.log(item))
  )
  .subscribe();

// 2 1 4 5
```

<br>
<br>

# Operator Internals

It always helps to take a look inside the functions we use to better understand how they work. Here is one of them.

## `map` Operator Interals

```javascript
import { Observable } from "rxjs";

export function map(fn) {
  return (input) =>
    new Observable((observer) => {
      return input.subscribe({
        next: (value) => observer.next(fn(value)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
}
```

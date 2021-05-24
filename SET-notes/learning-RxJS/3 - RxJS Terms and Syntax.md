# Introduction

## Processing Observable Streams

| Apple Factory                              | RxJS                                |
| ------------------------------------------ | ----------------------------------- |
| **Start the stream**                       | **Subscribe**                       |
| Emits items                                | Emits items                         |
| **Items pass through a set of operations** | **Pipe through a set of operators** |
| **As an observer**                         | **Observer**                        |
| Next item, process it                      | `next()`                            |
| Error occurred, handle it                  | `error()`                           |
| Complete, you're done                      | `complete()`                        |
| Stop the stream                            | Unsubscribe                         |

## Module Overview

- Observer/Subscriber
- Observable stream
- Starting the Observable stream / Subscription
- Stopping the Observable stream
- Creation functions
- RxJS Features
  - Of
  - From

<br/>
<br/>

# Observer/Subscriber

## Observer

- Observes the stream and responds to its notificataions

- Observer

  - next()
  - error()
  - complete()

### RxJS Docs:

> Observer: is a collection of callbacks that knows how to listen to values deliverered by the Observable

### Angular Docs:

> A JavaScript object that defines the handlers for the notifications you receive.

### RxJS Internal:

> In RxJS, an Observer is also defined as an interface with next, error, and complete methods.

## Subscriber

- Observer that can unsubscribe from an Observable

## Example

```javascript
// Long form syntax
const observer = {
  next: (apple) => console.log(`Apple was emitted ${apple}`),
  error: (err) => console.log(`Error occurred: ${err}`),
  complete: () => console.log(`No more apples, go home`),
};
```

<br/>
<br/>

# Observable Stream

- ### Any stream of data, optionally produced over time

  - Numbers
  - Strings
  - Events
  - Object literals
  - HTTP request response

- ### Also called:

  - An Observable squence
  - An Observable
  - A stream

- ### Observables can be synchronous or asynchronous
- ### Observables can emit a finite or infitnite number of values

## Example

```javascript
// Long form syntax
const appleStream = new Observable((appleObserver) => {
  appleObserver.next("Apple 1");
  appleObserver.next("Apple 2");
  appleObserver.complete();
});
```

<br/>
<br/>

# Starting the Observable Stream

- ### MUST subscribe to start the Observable stream

## Example

```javascript
const sub = appleStream.subscribe(observer);
```

## Better Syntax

```javascript
const sub = appleStream.subscribe(
  (apple) => console.log(`Apple was emitted ${apple}`),
  (err) => console.log(`Error occurred: ${err}`),
  () => console.log(`No more apples, go home`)
);
```

<br/>
<br/>

# Stopping the Observable Stream

- ## Saves potential memory leaks
<br/>

## Stopping an Observable Stream:

| Technique               | Completes? |
| ----------------------- | ---------- |
| Call complete           | ✔️         |
| Use completing operator | ✔️         |
| Throw an error          | ❌         |
| Unsubscribe             | ❌         |

<br/>

## Unsubscribing

```javascript
sub.unsubscribe();
```

<br/>
<br/>

# Creation Functions

## Inefficient:

```javascript
const appleStream = new Observable((appleObserver) => {
  appleObserver.next("Apple 1");
  appleObserver.next("Apple 2");
  appleObserver.complete();
});
```

## Recommended:

## `of()`

- Creates an observable using a set of defined values
- Emits the values then completes the stream

```javascript
const appleStream = of("Apple1", "Apple 2");
```

## `from()`

- Creates an observable from an array or other data structure
- Emits each value from the structure then completes the stream

```javascript
const appleStream = from(["Apple1", "Apple2"]);
```

## `of()` vs `from()`

```javascript
const apples = ["Apple 1", "Apple 2"];

from(apples);
// 'Apple 1'
// 'Apple 2'

of(apples);
// ['Apple 1', 'Apple 2']

of(...apples);
// 'Apple 1'
// 'Apple 2'
```

## `fromEvent()`

- Creates an observable from any DOM or DOM event

## `interval()`

- Creates an observable that emits a sequential number at a defined interval

<br>
<br>

# Summary & Checklists

- ## Terms

  - ### Observable
    - Any stream of data
  - ### Observer
    - Observes the stream
    - Methods to process notifications from the stream: `next()`, `error(`), `complete()`
  - ### Subscriber
    - An Observer that can unsubscribe
  - ### Subscription
    - Represents the execution of an Observable
    - `subscribe()` returns a Subscription

- ## Creating an Observable

  - ### Constructor
  - ### Creation functions
    - of, from, fromEvent, interval, ...
    - Create an Observable from anything
  - ### Returned from an Angular feature
    - Forms: valueChanges
    - Routing: paramMap
    - HTTP: get
    - ...

- ## Starting an Observable

  - ### Call subscribe!
  - ### Pass in an Observer
    - next(), error(), complete()

- ## Stopping an Observable
  - ### Call complete() on Observer
  - ### Use a creation function that completes
    - `of`, `from`, ...
  - ### Use an operator that completes
    - `take`, ...
  - ### Throw an error
  - ### Call `unsubscribe()` on the Subscription

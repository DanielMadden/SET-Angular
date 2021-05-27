# Deck Service

- I want the deck to be subscribable. This leads to cleaner, more controlled code and stays within the consistency of Angular applications using subscribers.
  - After watching a course on pluralsight, I decided the best route to take was to create a Subject `deckSubject`, and create the observable `deck$` _within_ the same Service. This observable is the one that can be subscribed to.
  - There will still be a deck, which is simply an array of ICard.
  - `emitDeck()` will emit the current array stored within the DeckService to any subscribers to the `deck$` Observable
  - `emitDeck()` will be called on every change to the deck. I'm not too sure if this is best practice. I may be breaking the rules of single responsibiliy. But I'm not too sure how to approach this otherwise.

## Functions

- All functions take zero parameters, and return nothing. They simply perform their task upon the `private deck: ICard[]` and then tell the `deckSubject` to emit to any observable subscriptions to `deck$`. The functions are:
  - `emitDeck(): void`
  - `resetDeck(): void`
  - `createDeck(): void`
  - `shuffleDeck(): void`

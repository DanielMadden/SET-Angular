import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Card, ICard } from '../models/card';
import { cardValues } from '../models/card-values';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private deck: ICard[] = [];
  private deckSubject = new Subject<ICard[]>();
  public deck$ = this.deckSubject.asObservable();

  constructor() {}

  public resetDeckSubject(): void {
    this.deckSubject = new Subject<ICard[]>();
  }

  private emitDeck(): void {
    this.deckSubject.next(this.deck);
  }

  private completeDeckObservable(): void {
    this.deckSubject.complete();
  }

  public getDeck(): ICard[] {
    return this.deck;
  }

  public resetDeck(): void {
    this.deck = [];
    this.emitDeck();
  }

  public createDeck(): void {
    this.resetDeck();
    cardValues.count.forEach((count) => {
      cardValues.color.forEach((color) => {
        cardValues.shape.forEach((shape) => {
          cardValues.shade.forEach((shade) => {
            this.deck.push(new Card(count, color, shape, shade));
          });
        });
      });
    });
    this.emitDeck();
  }

  /**
   * Fisher-Yates (aka Knuth) Shuffle
   * Stack Overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * Visualization: https://bost.ocks.org/mike/shuffle/
   * Blog Post: https://blog.codinghorror.com/the-danger-of-naivete/
   */
  public shuffleDeck(): void {
    var currentIndex = this.deck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = temporaryValue;
    }
    this.emitDeck();
  }

  public pullThreeCardsFromDeck(): [ICard, ICard, ICard] {
    let cards: [ICard, ICard, ICard] = [null!, null!, null!];
    for (let i = 0; i <= 2; i++) {
      cards[i] = this.deck.splice(
        Math.floor(Math.random() * this.deck.length),
        1
      )[0];
    }
    this.emitDeck();
    if (this.deck.length == 0) this.completeDeckObservable();
    return cards;
  }
}

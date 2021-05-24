import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { cardValues } from '../models/card-values';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  public deck: Card[] = [];

  constructor() {}

  resetDeck(): void {
    this.deck = [];
  }

  createDeck(): void {
    cardValues.count.forEach((count) => {
      cardValues.color.forEach((color) => {
        cardValues.shape.forEach((shape) => {
          cardValues.shade.forEach((shade) => {
            this.deck.push({
              count: count,
              color: color,
              shape: shape,
              shade: shade,
            });
          });
        });
      });
    });
  }

  /**
   * Fisher-Yates (aka Knuth) Shuffle
   * Stack Overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * Visualization: https://bost.ocks.org/mike/shuffle/
   */
  shuffleDeck(): void {
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
  }
}

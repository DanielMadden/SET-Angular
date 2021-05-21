import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { CardMatchCheck } from '../models/card-match-check';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  private cardProperties: string[] = ['count', 'color', 'shape', 'shade'];

  checkMatches(cards: Card[]): CardMatchCheck {
    let matches!: CardMatchCheck;

    this.cardProperties.forEach((prop) => {
      let match = true;
      for (let i = 0; i < 2; i++) {
        if (cards[i][prop] === cards[i + 1][prop]) match = !match;
      }
      matches[prop] = match;
    });

    return matches;
  }
}

/**
 * checkMatch logic
 *
 * All different:
 * Start with true. Second value is different, swap the value.
 * Now false. Third value is different, swap the value.
 * Now true.
 *
 * All true:
 * Start with true. Second value is same, keep value.
 * Still true. Third value is same, keep value.
 * Still true.
 *
 * Two same:
 * Start with true. Second value is same, keep value.
 * Still true. Third value is different, swap value.
 * Now false.
 */

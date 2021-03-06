import { Injectable } from '@angular/core';
import { ICard } from '../models/card';
import { ICardMatchCheck, CardMatchCheck } from '../models/card-match-check';
import { cardPropertiesArray } from '../models/card-properties';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  generateMatchCheck(cards: [ICard, ICard, ICard]): ICardMatchCheck {
    let matches = new CardMatchCheck();

    // Available for refactoring?
    cardPropertiesArray.forEach((prop) => {
      let match: boolean;
      if (
        cards[0][prop] === cards[1][prop] &&
        cards[1][prop] === cards[2][prop]
      )
        match = true;
      else if (
        cards[0][prop] !== cards[1][prop] &&
        cards[1][prop] !== cards[2][prop] &&
        cards[2][prop] !== cards[0][prop]
      )
        match = true;
      else match = false;
      matches[prop] = match;
    });

    return matches;
  }

  checkIfMatchCheckIsSet(matchCheck: ICardMatchCheck): boolean {
    if (
      matchCheck.color &&
      matchCheck.count &&
      matchCheck.shade &&
      matchCheck.shape
    )
      return true;
    else return false;
  }
}

// TODO Check if the first and last are the same

/**
 * old code... sadly it won't work if the first and third are the same
 *
 * let match = true;
      for (let i = 0; i < 2; i++) {
        if (cards[i][prop] !== cards[i + 1][prop]) match = !match;
      }
      matches[prop] = match;

 * logic
 *
 * All different:
 * Start with true. Second value is different, swap boolean.
 * Now false. Third value is different, swap boolean.
 * End: True.
 *
 * All true:
 * Start with true. Second value is same, keep boolean.
 * Still true. Third value is same, keep boolean.
 * End: True.
 *
 * Two same:
 * Start with true. Second value is same, keep boolean.
 * Still true. Third value is different, swap boolean.
 * End: False.
 *
 * Two different:
 * Start with true. Second value is different, swap boolean.
 * Now false. Third value is same, keep boolean.
 * End: False.
 */

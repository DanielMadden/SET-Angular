import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { CardMatchCheck } from '../models/card-match-check';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  private cardProperties: string[] = ['count', 'color', 'shape', 'pattern'];

  checkMatch(cards: Card[]) {
    let matches!: CardMatchCheck;
    if (
      cards[0].count === cards[1].count &&
      cards[1].count === cards[2].count
    ) {
      matches.count = true;
    } else if (
      cards[0].count !== cards[1].count &&
      cards[1].count !== cards[2].count &&
      cards[2].count !== cards[0].count
    ) {
      matches.count = true;
    } else matches.count = false;

    if (
      cards[0].color === cards[1].color &&
      cards[1].color === cards[2].color
    ) {
      matches.color = true;
    } else if (
      cards[0].color !== cards[1].color &&
      cards[1].color !== cards[2].color &&
      cards[2].color !== cards[0].color
    ) {
      matches.color = true;
    } else matches.color = false;

    if (
      cards[0].shape === cards[1].shape &&
      cards[1].shape === cards[2].shape
    ) {
      matches.shape = true;
    } else if (
      cards[0].shape !== cards[1].shape &&
      cards[1].shape !== cards[2].shape &&
      cards[2].shape !== cards[0].shape
    ) {
      matches.shape = true;
    } else matches.shape = false;

    if (
      cards[0].shade === cards[1].shade &&
      cards[1].shade === cards[2].shade
    ) {
      matches.shade = true;
    } else if (
      cards[0].shade !== cards[1].shade &&
      cards[1].shade !== cards[2].shade &&
      cards[2].shade !== cards[0].shade
    ) {
      matches.shade = true;
    } else matches.shade = false;

    if (
      matches.count === true &&
      matches.color === true &&
      matches.shape === true &&
      matches.shade === true
    )
      console.log("It's a match!");
    else console.log('No match: ' + matches);
  }
}

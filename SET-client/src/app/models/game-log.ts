import { ICard } from './card';

export interface IGameLog {
  cards: [ICard, ICard, ICard];
  type: 'match' | 'no match' | 'plus three';
  messages: string[];
}

export class GameLog implements IGameLog {
  cards!: [ICard, ICard, ICard];
  type!: 'match' | 'no match' | 'plus three';
  messages: string[] = [];

  constructor(
    cards: [ICard, ICard, ICard],
    type: 'match' | 'no match' | 'plus three'
  ) {
    this.cards = cards;
    this.type = type;
  }
}

import { ICard } from './card';

export interface IGameLog {
  cards: [ICard, ICard, ICard];
  action: string;
  messages: string[];
}

export class GameLog {
  cards!: [ICard, ICard, ICard];
  action: string = '';
  messages: string[] = [];

  constructor(cards: [ICard, ICard, ICard], action: string) {
    this.cards = cards;
    this.action = action;
  }
}

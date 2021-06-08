import { ICard } from './card';

export interface ICardGridSlot {
  display: boolean;
  card: ICard;
}

export class CardGridSlot {
  constructor(display: boolean, card: ICard) {
    this.display = display;
    this.card = card;
  }
  display: boolean;
  card: ICard;
}

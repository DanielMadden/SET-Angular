import { ICard } from './card';

export interface ICardGridSlot {
  display: boolean;
  selected: boolean;
  card: ICard;
}

export class CardGridSlot {
  constructor(card: ICard) {
    this.card = card;
  }
  display: boolean = true;
  selected: boolean = false;
  card: ICard;
}

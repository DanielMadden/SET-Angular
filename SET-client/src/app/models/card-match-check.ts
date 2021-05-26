export interface ICardMatchCheck {
  [key: string]: boolean;
  count: boolean;
  color: boolean;
  shape: boolean;
  shade: boolean;
}

export class CardMatchCheck implements ICardMatchCheck {
  [key: string]: boolean;
  count = false;
  color = false;
  shape = false;
  shade = false;
}

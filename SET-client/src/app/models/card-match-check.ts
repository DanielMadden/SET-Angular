export interface CardMatchCheck {
  [key: string]: boolean;
  count: boolean;
  color: boolean;
  shape: boolean;
  shade: boolean;
}

export class CardMatchCheckClass implements CardMatchCheck {
  [key: string]: boolean;
  count = false;
  color = false;
  shape = false;
  shade = false;
}

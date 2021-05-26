export interface CardMatchCheck {
  [key: string]: boolean;
  count: boolean;
  color: boolean;
  shape: boolean;
  shade: boolean;
}

// I use this to find out which properties were matches.
// This allows me to give the user info on what went wrong.
export class CardMatchCheckClass implements CardMatchCheck {
  [key: string]: boolean;
  count = false;
  color = false;
  shape = false;
  shade = false;
}

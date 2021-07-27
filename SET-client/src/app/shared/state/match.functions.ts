import { ICard } from 'src/app/models/card';
import {
  CardMatchCheck,
  ICardMatchCheck,
} from 'src/app/models/card-match-check';
import { cardPropertiesArray } from 'src/app/models/card-properties';

export function generateMatchCheck(
  cards: [ICard, ICard, ICard]
): ICardMatchCheck {
  let matches = new CardMatchCheck();

  cardPropertiesArray.forEach((prop) => {
    let match: boolean;
    if (cards[0][prop] === cards[1][prop] && cards[1][prop] === cards[2][prop])
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

export function checkIfMatchCheckIsSet(matchCheck: ICardMatchCheck): boolean {
  if (
    matchCheck.color &&
    matchCheck.count &&
    matchCheck.shade &&
    matchCheck.shape
  )
    return true;
  else return false;
}

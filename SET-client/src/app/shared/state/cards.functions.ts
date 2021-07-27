import { Card } from 'src/app/models/card';
import { CardGridSlot } from 'src/app/models/card-grid-slot';
import { cardValues } from 'src/app/models/card-values';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';

export function createDeck(): Card[] {
  let deck: Card[] = [];
  cardValues.count.forEach((count) => {
    cardValues.color.forEach((color) => {
      cardValues.shape.forEach((shape) => {
        cardValues.shade.forEach((shade) => {
          deck.push(new Card(count, color, shape, shade));
        });
      });
    });
  });
  return deck;
}

export function pullThreeRandomCardsFromDeck(deck: Card[]): [Card, Card, Card] {
  let cards: [Card, Card, Card] = [null!, null!, null!];
  for (let i = 0; i <= 2; i++) {
    cards[i] = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
  }
  return cards;
}

export function pullTwelveRandomCardsFromDeck(deck: Card[]): Card[] {
  let cards: Card[] = [];
  for (let i = 0; i < 4; i++) {
    cards.push(...pullThreeRandomCardsFromDeck(deck));
  }
  return cards;
}

export function newGridSlotsFromCards(cards: Card[]): CardGridSlot[] {
  let newSlots: CardGridSlot[] = [];
  cards.forEach((card) => newSlots.push(new CardGridSlot(card)));
  return newSlots;
}

export function replaceActiveCards(
  gridSlots: CardGridSlot[],
  selectedSlots: ISelectedCardSlot[],
  cards: [Card, Card, Card]
): CardGridSlot[] {
  for (let i = 0; i < 2; i++) {
    gridSlots[selectedSlots[i].slotIndex].card = cards[i];
  }
  return gridSlots;
}

export function shrinkSlotsArray(
  gridSlots: CardGridSlot[],
  selectedSlots: ISelectedCardSlot[]
): CardGridSlot[] {
  selectedSlots.sort((a, b) => b.slotIndex - a.slotIndex);
  for (let i = 0; i < selectedSlots.length; i++) {
    gridSlots.splice(selectedSlots[i].slotIndex, 1);
  }
  return gridSlots;
}

// export function threeRandomIndexes(deck: Card[]): [number, number, number] {
//   let indexes: [number, number, number] = [null!, null!, null!];
//   for (let i = 0; i <= 2; i++) {
//     indexes[i] = Math.floor(Math.random() * deck.length);
//   }
//   return indexes;
// }

// export function pickThreeCardsFromDeckByIndexes(
//   deck: Card[],
//   indexes: [number, number, number]
// ): [Card, Card, Card] {
//   let cards: [Card, Card, Card] = [null!, null!, null!];
//   for (let i = 0; i <= 2; i++) {
//     cards[i] = deck[indexes[i]];
//   }
//   return cards;
// }

// export function removeThreeCardsFromDeckByIndexes(
//   deck: Card[],
//   indexes: [number, number, number]
// ): void {
//   for (let i = 0; i <= 2; i++) {
//     deck.splice(indexes[i], 1);
//   }
// }

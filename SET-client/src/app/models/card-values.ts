interface cardValuesInterface {
  count: number[];
  color: number[];
  shape: ('oval' | 'diamond' | 'squiggle')[];
  shade: ('solid' | 'striped' | 'hollow')[];
}

// The potential values of a card, placed in an array on each property.
// I use this to loop through each property and generate a deck.
export const cardValues: cardValuesInterface = {
  count: [1, 2, 3],
  color: [1, 2, 3],
  shape: ['oval', 'diamond', 'squiggle'],
  shade: ['solid', 'striped', 'hollow'],
};

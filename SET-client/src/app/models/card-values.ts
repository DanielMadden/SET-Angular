interface ICardValues {
  count: number[];
  color: number[];
  shape: ('oval' | 'diamond' | 'squiggle')[];
  shade: ('solid' | 'striped' | 'hollow')[];
}

export const cardValues: ICardValues = {
  count: [1, 2, 3],
  color: [1, 2, 3],
  shape: ['oval', 'diamond', 'squiggle'],
  shade: ['solid', 'striped', 'hollow'],
};

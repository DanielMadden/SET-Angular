// This is a card.
export interface Card {
  [key: string]: any;
  count: number;
  color: number;
  shape: 'oval' | 'diamond' | 'squiggle';
  shade: 'solid' | 'striped' | 'hollow';
}

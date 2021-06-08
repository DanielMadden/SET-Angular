export interface ICard {
  [key: string]: any;
  count: 1 | 2 | 3;
  color: 1 | 2 | 3;
  shape: 'oval' | 'diamond' | 'squiggle';
  shade: 'solid' | 'striped' | 'hollow';
}

export class Card implements ICard {
  count!: 1 | 2 | 3;
  color!: 1 | 2 | 3;
  shape!: 'oval' | 'diamond' | 'squiggle';
  shade!: 'solid' | 'striped' | 'hollow';

  constructor(
    count: 1 | 2 | 3,
    color: 1 | 2 | 3,
    shape: 'oval' | 'diamond' | 'squiggle',
    shade: 'solid' | 'striped' | 'hollow'
  ) {
    this.count = count;
    this.color = color;
    this.shape = shape;
    this.shade = shade;
  }
}

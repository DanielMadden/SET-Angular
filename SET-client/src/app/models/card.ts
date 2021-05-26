export interface ICard {
  [key: string]: any;
  count: number;
  color: number;
  shape: 'oval' | 'diamond' | 'squiggle';
  shade: 'solid' | 'striped' | 'hollow';
}

export class Card implements ICard {
  count!: number;
  color!: number;
  shape!: 'oval' | 'diamond' | 'squiggle';
  shade!: 'solid' | 'striped' | 'hollow';

  constructor(
    count: number,
    color: number,
    shape: 'oval' | 'diamond' | 'squiggle',
    shade: 'solid' | 'striped' | 'hollow'
  ) {
    this.count = count;
    this.color = color;
    this.shape = shape;
    this.shade = shade;
  }
}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from 'src/app/models/card';

@Component({
  selector: 'app-set-card-deck',
  templateUrl: './set-card-deck.component.html',
  styleUrls: ['./set-card-deck.component.scss'],
})
export class SetCardDeckComponent implements OnInit, OnChanges {
  @Input() cardStream$!: Observable<ICard[]>;
  @Input() firstCards: ICard[] = [];
  cards: ICard[] = [];
  stackCountArray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cards = this.firstCards;
  }

  ngOnChanges(): void {
    this.cardStream$.subscribe(
      (cards) => {
        this.cards = cards;
        this.stackCountArray = [...Array(this.cards.length / 3).keys()];
      },
      (err) => console.error(`[ERROR]: ${err}`)
    );
    console.log('hi');
  }
}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-set-card-deck',
  templateUrl: './set-card-deck.component.html',
  styleUrls: ['./set-card-deck.component.scss'],
})
export class SetCardDeckComponent implements OnInit, OnChanges {
  @Input() cardStream$!: Observable<ICard[]>;
  @Input() pointToDeckService: boolean = false;
  cards: ICard[] = [];
  stackCountArray: number[] = [];
  stackPixelHeight: number = 0.5;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    if (this.pointToDeckService) this.updateCards(this.deckService.getDeck());
  }

  ngOnChanges(): void {
    this.cardStream$.subscribe(
      (cards) => this.updateCards(cards),
      (err) => console.error(`[ERROR]: ${err}`)
    );
    console.log('hi');
  }

  private updateCards(cards: ICard[]): void {
    this.cards = cards;
    this.stackCountArray = [...Array(this.cards.length / 3 + 1).keys()];
  }

  public calculateShadow(): string {
    let pixels = (this.stackCountArray.length + 5) * 1;
    return `${pixels / 2}px ${pixels / 2}px ${pixels}px px rgba(0, 0, 0, 0.7)`;
  }
}

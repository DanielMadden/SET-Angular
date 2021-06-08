import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { CardGridSlot, ICardGridSlot } from 'src/app/models/card-grid-slot';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-set-card-grid',
  templateUrl: './set-card-grid.component.html',
  styleUrls: ['./set-card-grid.component.scss'],
})
export class SetCardGridComponent implements OnInit {
  // public cards: ICard[] = [];
  public slots: ICardGridSlot[] = [];

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.createDeck();
    for (let i = 0; i < 4; i++) {
      let newCards = this.deckService.pullThreeCardsFromDeck();
      newCards.forEach((card) => this.slots.push(new CardGridSlot(true, card)));
    }
    console.log(this.slots);
  }
}

import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-set-card-grid',
  templateUrl: './set-card-grid.component.html',
  styleUrls: ['./set-card-grid.component.scss'],
})
export class SetCardGridComponent implements OnInit {
  public cards: ICard[] = [];

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.createDeck();
    for (let i = 0; i < 4; i++) {
      this.cards.push(...this.deckService.pullThreeCardsFromDeck());
    }
    console.log(this.cards);
  }
}

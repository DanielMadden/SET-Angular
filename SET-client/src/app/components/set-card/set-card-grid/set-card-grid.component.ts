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

    setTimeout(() => {
      this.cards.push(...this.deckService.pullThreeCardsFromDeck());
    }, 1000);

    setInterval(() => {
      let newCards = this.deckService.pullThreeCardsFromDeck();
      for (let i = 0; i < 3; i++) {
        this.cards[Math.floor(Math.random() * this.cards.length)] = newCards[i];
      }
    }, 3000);
  }
}

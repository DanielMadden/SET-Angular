import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-page-practice',
  templateUrl: './page-practice.component.html',
  styleUrls: ['./page-practice.component.scss'],
})
export class PagePracticeComponent implements OnInit {
  constructor(private deckService: DeckService) {}

  deck!: Observable<Card[]>;

  ngOnInit(): void {
    this.deck = this.deckService.deck$;
    this.deck.subscribe(
      (deck) => console.log(deck),
      (err) => console.log(`[ERROR] ${err}`),
      () => console.log(`Complete`)
    );
    this.deckService.createDeck();
    this.deckService.shuffleDeck();
    this.deckService.resetDeck();
  }
}

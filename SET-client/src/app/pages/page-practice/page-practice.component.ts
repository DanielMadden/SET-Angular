import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICard } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-page-practice',
  templateUrl: './page-practice.component.html',
  styleUrls: ['./page-practice.component.scss'],
})
export class PagePracticeComponent implements OnInit {
  constructor(
    private deckService: DeckService,
    private matchService: MatchService
  ) {}

  deck!: Observable<ICard[]>;

  ngOnInit(): void {
    this.deck = this.deckService.deck$;
    this.deck.subscribe(
      (deck) => console.log(deck),
      (err) => console.log(`[ERROR] ${err}`),
      () => console.log(`Complete`)
    );
    this.deckService.createDeck();
    this.deckService.shuffleDeck();
    // this.deckService.resetDeck();

    console.log(
      this.matchService.checkIfCardsMatch([
        {
          color: 1,
          count: 1,
          shade: 'solid',
          shape: 'diamond',
        },
        {
          color: 1,
          count: 1,
          shade: 'hollow',
          shape: 'diamond',
        },
        {
          color: 1,
          count: 1,
          shade: 'striped',
          shape: 'diamond',
        },
      ])
    );
    console.log(this.deckService.pullThreeCardsFromDeck());
  }
}

/**
 *
 this.deck = this.deckService.deck$;
    this.deck.subscribe(
      (deck) => console.log(deck),
      (err) => console.log(`[ERROR] ${err}`),
      () => console.log(`Complete`)
    );
    this.deckService.createDeck();
    this.deckService.shuffleDeck();
    this.deckService.resetDeck();

    console.log(
      this.matchService.checkIfCardsMatch([
        {
          color: 1,
          count: 1,
          shade: 'solid',
          shape: 'diamond',
        },
        {
          color: 1,
          count: 1,
          shade: 'hollow',
          shape: 'diamond',
        },
        {
          color: 1,
          count: 1,
          shade: 'striped',
          shape: 'diamond',
        },
      ])
    );
 */

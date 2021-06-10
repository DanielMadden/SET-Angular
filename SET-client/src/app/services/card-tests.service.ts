import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../models/card';
import { DeckService } from './deck.service';
import { MatchService } from './match.service';

@Injectable({
  providedIn: 'root',
})
export class CardTestsService {
  deck!: Observable<ICard[]>;

  constructor(
    private deckService: DeckService,
    private matchService: MatchService
  ) {}

  public runTests(): void {
    this.deck = this.deckService.deck$;
    this.deck.subscribe(
      (deck) => console.log(deck),
      (err) => console.log(`[ERROR] ${err}`),
      () => console.log(`Complete`)
    );
    this.deckService.createDeck();
    this.deckService.shuffleDeck();
    // this.deckService.resetDeck();

    let threeRandoms = this.deckService.pullThreeCardsFromDeck();

    console.log(threeRandoms);

    console.log(this.matchService.generateMatchCheck(threeRandoms));
  }
}

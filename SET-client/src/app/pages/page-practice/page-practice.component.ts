import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICard } from 'src/app/models/card';
import { CardTestsService } from 'src/app/services/card-tests.service';
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
    private matchService: MatchService,
    private cardTestsService: CardTestsService
  ) {}

  public deck$!: Observable<ICard[]>;
  private deck: ICard[] = [];
  private hand: ICard[] = [];
  private handSubject = new Subject<ICard[]>();
  public hand$: Observable<ICard[]> = this.handSubject.asObservable();

  ngOnInit(): void {
    this.deck$ = this.deckService.deck$;
    this.deck$.subscribe((deck) => {
      this.deck = deck;
    });
    this.deckService.createDeck();
  }

  private emitHand(): void {
    this.handSubject.next(this.hand);
  }

  addCardsToHand(cards: [ICard, ICard, ICard]) {
    this.hand.push(...cards);
    this.emitHand();
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
      this.matchService.generateMatchCheck([
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

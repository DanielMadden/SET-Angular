import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  public deck$!: Observable<ICard[]>;
  private deck: ICard[] = [];
  private hand: ICard[] = [];
  private handSubject = new Subject<ICard[]>();
  public hand$: Observable<ICard[]> = this.handSubject.asObservable();
  private tellGridToAddThreeCardsSubject = new Subject<boolean>();
  public tellGridToAddThreeCards$ =
    this.tellGridToAddThreeCardsSubject.asObservable();

  public gameMode = 'Practice';
  public time = '1';
  public sets = 0;
  public cardsRemaining = 81;

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

  public addCardsToHand(cards: [ICard, ICard, ICard]) {
    this.hand.push(...cards);
    this.emitHand();
  }

  public tellGridToAddThreeCards() {
    this.tellGridToAddThreeCardsSubject.next(true);
  }
}

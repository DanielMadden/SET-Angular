import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, Subject } from 'rxjs';
import { ICard } from 'src/app/models/card';
import { GameLog, IGameLog } from 'src/app/models/game-log';
import { DeckService } from 'src/app/services/deck.service';
import { MatchService } from 'src/app/services/match.service';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-page-practice',
  templateUrl: './page-practice.component.html',
  styleUrls: ['./page-practice.component.scss'],
})
export class PagePracticeComponent implements OnInit {
  constructor(
    private deckService: DeckService,
    private matchService: MatchService,
    private soundService: SoundService
  ) {}

  public deck$!: Observable<ICard[]>;
  private deck: ICard[] = [];
  private hand: ICard[] = [];
  private handSubject = new Subject<ICard[]>();
  public hand$: Observable<ICard[]> = this.handSubject.asObservable();
  private tellGridToAddThreeCardsSubject = new Subject<boolean>();
  public tellGridToAddThreeCards$ =
    this.tellGridToAddThreeCardsSubject.asObservable();
  private gameLogSubject = new Subject<IGameLog>();
  public gameLogStream$ = this.gameLogSubject.asObservable();
  private startGameLogSubject = new Subject<boolean>();
  public startGameLog$ = this.startGameLogSubject.asObservable();

  private startingMilliseconds!: number;
  private secondsCounter!: Observable<number>;
  private secondsPassed!: number;
  public gameMode = 'Practice';
  public timePassed = '1';
  public sets = 0;
  public cardsRemaining = 81;

  public showGameLogOnMobile = false;
  public gameLogOnMobileStatsHeight = 169;
  public gameLogOnMobileHeight =
    window.innerHeight - this.gameLogOnMobileStatsHeight;

  ngOnInit(): void {
    this.deck$ = this.deckService.deck$;
    this.deckService.createDeck();
    this.deck$.subscribe((deck) => {
      this.deck = deck;
      this.cardsRemaining = this.deck.length;
    });
    this.subscribeToPageResize();
  }

  public startGame() {
    this.startTimer();
    this.startGameLog();
  }

  private emitHand(): void {
    this.handSubject.next(this.hand);
  }

  public setOfCardsEvent(cards: [ICard, ICard, ICard]) {
    this.soundService.playFxSound('ding');
    this.emitGameLog(cards, 'match');
    this.addCardsToHand(cards);
  }

  public falseSetOfCardsEvent(cards: [ICard, ICard, ICard]) {
    this.soundService.playFxSound('error');
    this.emitGameLog(cards, 'no match');
  }

  public addCardsToHand(cards: [ICard, ICard, ICard]) {
    this.hand.push(...cards);
    this.sets = this.hand.length / 3;
    this.emitHand();
  }

  public addThreeCards() {
    this.soundService.playCardSound('random-pull');
    this.tellGridToAddThreeCards();
  }

  public tellGridToAddThreeCards() {
    this.tellGridToAddThreeCardsSubject.next(true);
  }

  public sendThePlusThreeCardsToGameLog(cards: [ICard, ICard, ICard]) {
    this.emitGameLog(cards, 'plus three');
  }

  private emitGameLog(
    cards: [ICard, ICard, ICard],
    type: 'match' | 'no match' | 'plus three'
  ) {
    console.log('emitGameLog()');
    this.gameLogSubject.next(new GameLog(cards, type));
  }

  private startGameLog() {
    this.startGameLogSubject.complete();
  }

  private startTimer() {
    this.startingMilliseconds = new Date().getTime();
    this.secondsCounter = interval(100);
    this.secondsCounter.subscribe(() => {
      this.secondsPassed = Math.floor(
        (new Date().getTime() - this.startingMilliseconds) / 1000
      );
      this.setTime();
    });
  }

  private setTime() {
    let minutesPassed = Math.floor(this.secondsPassed / 60);
    let secondsPerMinutePassed = this.secondsPassed % 60;
    this.timePassed = `
    ${minutesPassed > 0 ? minutesPassed : ''} ${minutesPassed > 0 ? ':' : ''} ${
      secondsPerMinutePassed < 10 ? '0' : ''
    }${secondsPerMinutePassed}
    `;
  }

  public travelHome() {}

  private subscribeToPageResize() {
    fromEvent(window, 'resize').subscribe(() => {
      this.gameLogOnMobileHeight =
        window.innerHeight - this.gameLogOnMobileStatsHeight;
    });
  }
}

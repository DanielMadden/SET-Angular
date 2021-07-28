import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, interval, Observable } from 'rxjs';
import { PracticePageActions } from 'src/app/actions';
import { ICard } from 'src/app/models/card';
import { SoundService } from 'src/app/services/sound.service';
import { selectDeck, selectHand, State } from 'src/app/shared/state';

@Component({
  selector: 'app-page-practice',
  templateUrl: './page-practice.component.html',
  styleUrls: ['./page-practice.component.scss'],
})
export class PagePracticeComponent implements OnInit {
  public deck$: Observable<ICard[]>;
  public hand$: Observable<ICard[]>;

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

  constructor(private soundService: SoundService, private store: Store<State>) {
    this.deck$ = store.select(selectDeck);
    this.hand$ = store.select(selectHand);
  }

  ngOnInit(): void {
    this.deck$.subscribe((deck) => {
      this.cardsRemaining = deck.length;
    });
    this.hand$.subscribe((hand) => {
      this.sets = hand.length / 3;
    });
    this.subscribeToPageResize();
    this.startTimer();
  }

  public addThreeCards() {
    this.soundService.playCardSound('random-pull');
    this.store.dispatch(PracticePageActions.addThreeCards());
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

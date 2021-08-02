import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CardActions } from '../actions';
import { ICard } from '../models/card';
import { ICardGridSlot } from '../models/card-grid-slot';
import { IGameLog } from '../models/game-log';
import { ISelectedCardSlot } from '../models/selected-card-slot';
import {
  selectActiveGridSlots,
  selectDeck,
  selectGameLogs,
  selectGridSlots,
  selectHand,
  State,
} from '../shared/state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  deck: ICard[] = [];
  hand: ICard[] = [];
  gridSlots: ICardGridSlot[] = [];
  selectedGridSlots: ISelectedCardSlot[] = [];
  gameLogs: IGameLog[] = [];

  deck$: Observable<ICard[]>;
  hand$: Observable<ICard[]>;
  gridSlots$: Observable<ICardGridSlot[]>;
  selectedGridSlots$: Observable<ISelectedCardSlot[]>;
  gameLogs$: Observable<IGameLog[]>;

  constructor(private store: Store<State>) {
    this.deck$ = store.select(selectDeck);
    this.hand$ = store.select(selectHand);
    this.gridSlots$ = store.select(selectGridSlots);
    this.selectedGridSlots$ = store.select(selectActiveGridSlots);
    this.gameLogs$ = store.select(selectGameLogs);

    this.deck$.subscribe(
      pipe((deck: ICard[]) => {
        this.deck = deck;
      })
    );
    this.hand$.subscribe(
      pipe((hand: ICard[]) => {
        this.hand = hand;
      })
    );
    this.gridSlots$.subscribe(
      pipe((gridSlots: ICardGridSlot[]) => {
        this.gridSlots = gridSlots;
      })
    );
    this.selectedGridSlots$.subscribe(
      pipe((selectedGridSlots: ISelectedCardSlot[]) => {
        this.selectedGridSlots = selectedGridSlots;
      })
    );
    this.gameLogs$.subscribe(
      pipe((gameLogs: IGameLog[]) => {
        this.gameLogs = gameLogs;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CardActions } from '../actions';
import { ICard } from '../models/card';
import { ICardGridSlot } from '../models/card-grid-slot';
import { GameLog, IGameLog } from '../models/game-log';
import { ISelectedCardSlot } from '../models/selected-card-slot';
import {
  selectActiveGridSlots,
  selectDeck,
  selectGameLogs,
  selectGridSlots,
  selectHand,
  State,
} from '../shared/state';
import * as cardFunctions from '../shared/state/cards.functions';
import * as matchFunctions from '../shared/state/match.functions';

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

  private deepCopyArray(array: any[]) {
    return JSON.parse(JSON.stringify(array));
  }

  // Creates a deck, pulls twelve cards, and places them in the grid
  startGameEvent() {
    let newDeck = cardFunctions.createDeck();
    let newCards = cardFunctions.pullTwelveRandomCardsFromDeck(newDeck);
    let newSlots = cardFunctions.newGridSlotsFromCards(newCards);

    // Update State
    this.store.dispatch(CardActions.updateDeck({ deck: newDeck }));
    this.store.dispatch(CardActions.updateGridSlots({ gridSlots: newSlots }));
  }

  // Pulls three cards from deck, places them in the grid, then adds a new game log
  addThreeCardsEvent() {
    let newDeck: ICard[] = this.deepCopyArray(this.deck);
    let newCards = cardFunctions.pullThreeRandomCardsFromDeck(newDeck);
    let newSlots = cardFunctions.newGridSlotsFromCards(newCards);

    // Update State
    this.store.dispatch(CardActions.updateDeck({ deck: newDeck }));
    this.store.dispatch(CardActions.addGridSlots({ gridSlots: newSlots }));
    this.addGameLog(newCards, 'plus three');
  }

  // Adds a game log to the state's gameLogs
  private addGameLog(
    cards: [ICard, ICard, ICard],
    type: 'match' | 'no match' | 'plus three'
  ) {
    this.store.dispatch(
      CardActions.addGameLog({ gameLog: new GameLog(cards, type) })
    );
  }

  selectCardEvent(cardGridSlotIndex: number) {
    let newGridSlots: ICardGridSlot[] = this.deepCopyArray(this.gridSlots);
    let newSelectedGridSlots: ISelectedCardSlot[] = this.deepCopyArray(
      this.selectedGridSlots
    );

    // Modify Arrays
    newGridSlots[cardGridSlotIndex].selected = true;
    newSelectedGridSlots.push({
      slotIndex: cardGridSlotIndex,
      card: newGridSlots[cardGridSlotIndex].card,
    });

    // Update State
    this.store.dispatch(
      CardActions.updateGridSlots({ gridSlots: newGridSlots })
    );
    this.store.dispatch(
      CardActions.updateSelectedGridSlots({
        selectedGridSlots: newSelectedGridSlots,
      })
    );

    if (this.selectedGridSlots.length > 2) this.checkForSetEvent();
  }

  deSelectCardEvent(cardGridSlotIndex: number) {
    let newGridSlots: ICardGridSlot[] = this.deepCopyArray(this.gridSlots);
    let newSelectedGridSlots: ISelectedCardSlot[] = this.deepCopyArray(
      this.selectedGridSlots
    );

    newGridSlots[cardGridSlotIndex].selected = false;
    let slotIndex = newSelectedGridSlots.findIndex(
      (slot) => slot.slotIndex === cardGridSlotIndex
    );
    newSelectedGridSlots.splice(slotIndex, 1);

    this.store.dispatch(
      CardActions.updateGridSlots({ gridSlots: newGridSlots })
    );
    this.store.dispatch(
      CardActions.updateSelectedGridSlots({
        selectedGridSlots: newSelectedGridSlots,
      })
    );
  }

  checkForSetEvent() {
    let cardsToCheck: [ICard, ICard, ICard] = [
      this.selectedGridSlots[0].card,
      this.selectedGridSlots[1].card,
      this.selectedGridSlots[2].card,
    ];
    let matchCheck = matchFunctions.generateMatchCheck(cardsToCheck);
    let isSet = matchFunctions.checkIfMatchCheckIsSet(matchCheck);
    let newGridSlots: ICardGridSlot[] = this.deepCopyArray(this.gridSlots);

    if (isSet) {
      let newDeck: ICard[] = this.deepCopyArray(this.deck);
      if (this.gridSlots.length <= 12) {
        let newCards = cardFunctions.pullThreeRandomCardsFromDeck(newDeck);
        // this.replaceActiveCardsWithNewCards(newDeck, newCards, newGridSlots);
        newGridSlots = cardFunctions.replaceActiveCards(
          newGridSlots,
          this.selectedGridSlots,
          newCards
        );

        this.store.dispatch(CardActions.updateDeck({ deck: newDeck }));
      } else {
        newGridSlots = cardFunctions.shrinkSlotsArray(
          newGridSlots,
          this.selectedGridSlots
        );
      }

      this.store.dispatch(CardActions.addToHand({ newCards: cardsToCheck }));
      this.addGameLog(cardsToCheck, 'match');
    } else {
      this.addGameLog(cardsToCheck, 'no match');
    }

    this.selectedGridSlots.forEach(
      (slot) => (newGridSlots[slot.slotIndex].selected = false)
    );
    this.store.dispatch(
      CardActions.updateGridSlots({ gridSlots: newGridSlots })
    );
    this.store.dispatch(
      CardActions.updateSelectedGridSlots({ selectedGridSlots: [] })
    );
  }

  private deSelectGridSlots() {}

  // replaceActiveCardsWithNewCards(
  //   newDeck: ICard[],
  //   newCards: [ICard, ICard, ICard],
  //   newGridSlots: ICardGridSlot[]
  // ) {
  //   newGridSlots = cardFunctions.replaceActiveCards(
  //     newGridSlots,
  //     this.selectedGridSlots,
  //     newCards
  //   );

  //   this.store.dispatch(CardActions.updateDeck({ deck: newDeck }));
  // }

  // removeActiveCards() {}
}

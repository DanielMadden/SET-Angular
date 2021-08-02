import { Action, createReducer, on } from '@ngrx/store';
import { Card, ICard } from 'src/app/models/card';
import { CardGridSlot, ICardGridSlot } from 'src/app/models/card-grid-slot';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';
import { CardActions } from 'src/app/actions';
import * as cardFunctions from './cards.functions';
import * as matchFunctions from './match.functions';
import { state } from '@angular/animations';
import { GameLog, IGameLog } from 'src/app/models/game-log';

export interface State {
  deck: ICard[];
  hand: ICard[];
  gridSlots: ICardGridSlot[];
  selectedGridSlots: ISelectedCardSlot[];
  gameLogs: IGameLog[];
}

export const initialState: State = {
  deck: [],
  hand: [],
  gridSlots: [],
  selectedGridSlots: [],
  gameLogs: [],
};

export const cardsReducer = createReducer(
  initialState,
  on(CardActions.updateDeck, (state, action) => {
    return {
      ...state,
      deck: action.deck,
    };
  }),
  on(CardActions.updateGridSlots, (state, action) => {
    return {
      ...state,
      gridSlots: action.gridSlots,
    };
  }),
  on(CardActions.updateSelectedGridSlots, (state, action) => {
    return {
      ...state,
      selectedGridSlots: action.selectedGridSlots,
    };
  }),
  on(CardActions.addGridSlots, (state, action) => {
    return {
      ...state,
      gridSlots: [...state.gridSlots, ...action.gridSlots],
    };
  }),
  on(CardActions.addGameLog, (state, action) => {
    return {
      ...state,
      gameLogs: [action.gameLog, ...state.gameLogs],
    };
  }),
  on(CardActions.emptyDeck, (state) => {
    return {
      ...state,
      deck: [],
    };
  }),
  on(CardActions.emptyGridSlots, (state) => {
    return {
      ...state,
      gridSlots: [],
    };
  }),
  on(CardActions.emptySelectedGridSlots, (state) => {
    return {
      ...state,
      selectedGridSlots: [],
    };
  }),
  on(CardActions.emptyGameLogs, (state) => {
    return {
      ...state,
      gameLogs: [],
    };
  })
);

export function reducer(state: undefined | State, action: Action) {
  return cardsReducer(state, action);
}

export const selectDeck = (state: State) => state.deck;
export const selectDeckLength = (state: State) => state.deck.length;
export const selectHand = (state: State) => state.hand;
export const selectHandLength = (state: State) => state.hand.length;
export const selectGridSlots = (state: State) => state.gridSlots;
export const selectActiveGridSlots = (state: State) => state.selectedGridSlots;
export const selectGameLogs = (state: State) => state.gameLogs;

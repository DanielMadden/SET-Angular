import { Action, createReducer, on } from '@ngrx/store';
import { Card, ICard } from 'src/app/models/card';
import { CardGridSlot } from 'src/app/models/card-grid-slot';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';
import { PracticePageActions } from 'src/app/actions';
import {
  createDeck,
  newGridSlotsFromCards,
  pullThreeCardsFromDeck,
  pullTwelveCardsFromDeck,
} from './cards.functions';
import { state } from '@angular/animations';

export interface State {
  deck: Card[];
  gridSlots: CardGridSlot[];
  selectedGridSlots: ISelectedCardSlot[];
}

export const initialState: State = {
  deck: [],
  gridSlots: [],
  selectedGridSlots: [],
};

export const cardsReducer = createReducer(
  initialState,
  on(PracticePageActions.enter, (state, action) => {
    let newDeck = createDeck();
    let newCards = pullTwelveCardsFromDeck(newDeck);
    let newSlots = newGridSlotsFromCards(newCards);
    return {
      ...state,
      deck: newDeck,
      gridSlots: newSlots,
    };
  }),
  on(PracticePageActions.addThreeCards, (state, action) => {
    let threeCards = pullThreeCardsFromDeck(state.deck);
    let threeSlots = newGridSlotsFromCards(threeCards);
    return {
      ...state,
      gridSlots: [...state.gridSlots, ...threeSlots],
    };
  })
);

export function reducer(state: undefined | State, action: Action) {
  return cardsReducer(state, action);
}

export const selectDeck = (state: State) => state.deck;
export const selectGridSlots = (state: State) => state.gridSlots;
export const selectActiveGridSlots = (state: State) => state.selectedGridSlots;

import { Action, createReducer, on } from '@ngrx/store';
import { Card, ICard } from 'src/app/models/card';
import { CardGridSlot } from 'src/app/models/card-grid-slot';
import { ISelectedCardSlot } from 'src/app/models/selected-card-slot';
import { PracticePageActions } from 'src/app/actions';
import {
  createDeck,
  newGridSlotsFromCards,
  pullThreeRandomCardsFromDeck,
  pullTwelveRandomCardsFromDeck,
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
  on(PracticePageActions.enter, (state) => {
    let newDeck = createDeck();
    let newCards = pullTwelveRandomCardsFromDeck(newDeck);
    let newSlots = newGridSlotsFromCards(newCards);
    return {
      ...state,
      deck: newDeck,
      gridSlots: newSlots,
    };
  }),
  on(PracticePageActions.addThreeCards, (state) => {
    let newDeck = [...state.deck];
    let newCards = pullThreeRandomCardsFromDeck(newDeck);
    let newSlots = newGridSlotsFromCards(newCards);
    return {
      ...state,
      gridSlots: [...state.gridSlots, ...newSlots],
      deck: newDeck,
    };
  }),
  on(PracticePageActions.selectCard, (state, action) => {
    if (state.selectedGridSlots.length < 3) {
      return {
        ...state,
        selectedGridSlots: [
          ...state.selectedGridSlots,
          {
            slotIndex: action.cardGridSlotIndex,
            card: state.gridSlots[action.cardGridSlotIndex].card,
          },
        ],
      };
    } else
      return {
        ...state,
      };
  })
);

export function reducer(state: undefined | State, action: Action) {
  return cardsReducer(state, action);
}

export const selectDeck = (state: State) => state.deck;
export const selectDeckLength = (state: State) => state.deck.length;
export const selectGridSlots = (state: State) => state.gridSlots;
export const selectActiveGridSlots = (state: State) => state.selectedGridSlots;

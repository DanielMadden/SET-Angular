import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromCards from './cards.reducer';

export interface State {
  cards: fromCards.State;
}

export const reducers: ActionReducerMap<State> = {
  cards: fromCards.reducer,
};

export const selectCardsState = (state: State) => state.cards;
export const selectDeck = createSelector(
  selectCardsState,
  fromCards.selectDeck
);
export const selectDeckLength = createSelector(
  selectCardsState,
  fromCards.selectDeckLength
);
export const selectHand = createSelector(
  selectCardsState,
  fromCards.selectHand
);
export const selectHandLength = createSelector(
  selectCardsState,
  fromCards.selectHandLength
);
export const selectGridSlots = createSelector(
  selectCardsState,
  fromCards.selectGridSlots
);
export const selectActiveGridSlots = createSelector(
  selectCardsState,
  fromCards.selectActiveGridSlots
);
export const selectGameLogs = createSelector(
  selectCardsState,
  fromCards.selectGameLogs
);

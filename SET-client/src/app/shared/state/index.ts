import { ActionReducerMap } from '@ngrx/store';
import * as fromCards from './cards.reducer';

export interface State {
  cards: fromCards.State;
}

export const reducers: ActionReducerMap<State> = {
  cards: fromCards.reducer,
};

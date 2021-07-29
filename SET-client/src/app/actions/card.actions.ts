import { createAction, props } from '@ngrx/store';

export const start = createAction('[Practice Page] Enter');

export const addThreeCards = createAction('[Practice Page] Add Three Cards');

export const selectCard = createAction(
  '[Practice Page] Select Card',
  props<{ cardGridSlotIndex: number }>()
);

export const deselectCard = createAction(
  '[Practice Page] Deselect Card',
  props<{ cardGridSlotIndex: number }>()
);

import { createAction, props } from '@ngrx/store';
import { ICard } from '../models/card';
import { CardGridSlot } from '../models/card-grid-slot';
import { GameLog } from '../models/game-log';
import { ISelectedCardSlot } from '../models/selected-card-slot';

export const startGame = createAction('[Cards] Start Game');

export const addThreeCards = createAction('[Cards] Add Three Cards');

export const selectCard = createAction(
  '[Cards] Select Card',
  props<{ cardGridSlotIndex: number }>()
);

export const deselectCard = createAction(
  '[Cards] Deselect Card',
  props<{ cardGridSlotIndex: number }>()
);

export const updateDeck = createAction(
  '[Cards] Update Deck',
  props<{ deck: ICard[] }>()
);

export const updateGridSlots = createAction(
  '[Cards] Update Grid Slots',
  props<{ gridSlots: CardGridSlot[] }>()
);

export const updateSelectedGridSlots = createAction(
  '[Cards] Update Selected Grid Slots',
  props<{ selectedGridSlots: ISelectedCardSlot[] }>()
);

export const addGameLog = createAction(
  '[GameLog] Add Gamelog',
  props<{ gameLog: GameLog }>()
);

export const emptyDeck = createAction('[Cards] Empty Selected Gridslots');

export const emptyGridSlots = createAction('[Cards] Empty Selected Gridslots');

export const emptySelectedGridSlots = createAction(
  '[Cards] Empty Selected Gridslots'
);

export const emptyGameLogs = createAction('[Cards] Empty Gamelogs');

export const addToHand = createAction(
  '[Cards] Add To Hand',
  props<{ newCards: ICard[] }>()
);

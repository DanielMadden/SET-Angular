import { createAction, props } from '@ngrx/store';
import { ICard } from '../models/card';
import { CardGridSlot } from '../models/card-grid-slot';
import { GameLog } from '../models/game-log';
import { ISelectedCardSlot } from '../models/selected-card-slot';

export const startGame = createAction('[Game] Start');

export const updateDeck = createAction(
  '[Deck] Update',
  props<{ deck: ICard[] }>()
);

export const updateGridSlots = createAction(
  '[Grid Slots] Update',
  props<{ gridSlots: CardGridSlot[] }>()
);

export const updateSelectedGridSlots = createAction(
  '[Selected Slots] Update',
  props<{ selectedGridSlots: ISelectedCardSlot[] }>()
);

export const addGridSlots = createAction(
  '[Grid Slots] Add',
  props<{ gridSlots: CardGridSlot[] }>()
);

export const addGameLog = createAction(
  '[GameLog] Add',
  props<{ gameLog: GameLog }>()
);

export const emptyDeck = createAction('[Deck] Reset');

export const emptyGridSlots = createAction('[Grid Slots] Reset');

export const emptySelectedGridSlots = createAction('[Selected Slots] Reset');

export const emptyGameLogs = createAction('[GameLog] Reset');

export const addToHand = createAction(
  '[Hand] Add',
  props<{ newCards: ICard[] }>()
);

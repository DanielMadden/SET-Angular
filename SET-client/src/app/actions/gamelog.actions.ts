import { createAction, props } from '@ngrx/store';
import { GameLog } from '../models/game-log';

export const newGameLog = createAction(
  '[GameLog] Add Gamelog',
  props<{ gameLog: GameLog }>()
);

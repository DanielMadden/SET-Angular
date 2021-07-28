import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGameLog } from 'src/app/models/game-log';
import { listAnimation } from 'src/app/shared/animations';
import { selectGameLogs, State } from 'src/app/shared/state';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.scss'],
  animations: [listAnimation],
})
export class GameLogComponent {
  @Input() gameLogs$: Observable<IGameLog[]>;

  constructor(private store: Store<State>) {
    this.gameLogs$ = store.select(selectGameLogs);
  }
}

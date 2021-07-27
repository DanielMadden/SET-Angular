import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICard } from 'src/app/models/card';
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
  @Input() gameLogs: IGameLog[] = [];
  @Input() gameLogs$: Observable<IGameLog[]>;
  @Input() startListeningForGameLogs$!: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.gameLogs$ = store.select(selectGameLogs);
  }

  // ngOnInit(): void {
  //   this.startListeningForGameLogs$.subscribe({
  //     complete: () => this.listenForGameLogs(),
  //   });
  // }

  // listenForGameLogs(): void {
  //   this.gameLog$.subscribe((gameLog) => this.addGameLog(gameLog));
  // }

  // addGameLog(gameLog: IGameLog): void {
  //   this.gameLogs.unshift(gameLog);
  // }
}

import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { IGameLog } from 'src/app/models/game-log';

@Component({
  selector: 'app-game-log-message',
  templateUrl: './game-log-message.component.html',
  styleUrls: ['./game-log-message.component.scss'],
})
export class GameLogMessageComponent implements OnInit {
  @Input() gameLog!: IGameLog;
  @Input() gameLogId!: number;
  public actionMessages = {
    match: 'Match!',
    'no match': 'No match',
    'plus three': '+3 Cards',
  };

  constructor() {}

  ngOnInit(): void {}
}

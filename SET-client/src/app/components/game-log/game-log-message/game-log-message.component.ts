import { Component, Input, OnInit } from '@angular/core';
import { IGameLog } from 'src/app/models/game-log';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-game-log-message',
  templateUrl: './game-log-message.component.html',
  styleUrls: ['./game-log-message.component.scss'],
})
export class GameLogMessageComponent implements OnInit {
  @Input() gameLog!: IGameLog;
  @Input() gameLogId!: number;
  @Input() last = false;
  public actionMessages = {
    match: 'Match!',
    'no match': 'No match',
    'plus three': '+3 Cards',
  };
  public gameLogMessages: string[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    if (this.gameLog.type == 'no match') {
      this.generateMessages();
    }
  }
  generateMessages() {
    let doesNotMatchString = ' does not match';
    let matchCheck = this.matchService.generateMatchCheck(this.gameLog.cards);
    if (!matchCheck.count)
      this.gameLogMessages.push('Count' + doesNotMatchString);
    if (!matchCheck.color)
      this.gameLogMessages.push('Color' + doesNotMatchString);
    if (!matchCheck.shape)
      this.gameLogMessages.push('Shape' + doesNotMatchString);
    if (!matchCheck.shade)
      this.gameLogMessages.push('Shade' + doesNotMatchString);
  }
}

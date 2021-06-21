import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
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
  public actionMessages = {
    match: 'Match!',
    'no match': 'No match',
    'plus three': '+3 Cards',
  };
  private gameLogWidth = parseInt(
    document.getElementById('game-log')!.style.width
  );
  public leftCSSProperty = -1 * this.gameLogWidth;

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
      this.gameLog.messages.push('Count' + doesNotMatchString);
    if (!matchCheck.color)
      this.gameLog.messages.push('Color' + doesNotMatchString);
    if (!matchCheck.shape)
      this.gameLog.messages.push('Shape' + doesNotMatchString);
    if (!matchCheck.shade)
      this.gameLog.messages.push('Shade' + doesNotMatchString);
  }
  animateSlideIn() {
    this.leftCSSProperty = 0;
  }
}

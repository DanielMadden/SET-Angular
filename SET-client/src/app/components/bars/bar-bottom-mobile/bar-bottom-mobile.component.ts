import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-bar-bottom-mobile',
  templateUrl: './bar-bottom-mobile.component.html',
  styleUrls: ['./bar-bottom-mobile.component.scss'],
})
export class BarBottomMobileComponent implements OnInit {
  public barHeight = gameBarHeight;

  @Output() openGameLogEvent = new EventEmitter();
  @Output() goHomeEvent = new EventEmitter();
  @Output() plusThreeCardsEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitButtonPress(event: 'gameLog' | 'goHome' | 'plusThreeCards') {
    if (event === 'gameLog') {
      this.openGameLogEvent.emit();
    }
    if (event === 'goHome') {
      this.goHomeEvent.emit();
    }
    if (event === 'plusThreeCards') {
      this.plusThreeCardsEvent.emit();
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-bar-bottom-desktop',
  templateUrl: './bar-bottom-desktop.component.html',
  styleUrls: ['./bar-bottom-desktop.component.scss'],
})
export class BarBottomDesktopComponent implements OnInit {
  @Input() gameMode: string = '';
  @Input() time: string = '';
  @Input() sets: number = 0;
  @Input() cardsRemaining!: number;

  public barHeight = gameBarHeight;

  constructor() {}

  ngOnInit(): void {}
}

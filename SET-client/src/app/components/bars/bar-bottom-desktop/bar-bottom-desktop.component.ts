import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}

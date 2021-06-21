import { Component, OnInit } from '@angular/core';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-bar-top',
  templateUrl: './bar-top.component.html',
  styleUrls: ['./bar-top.component.scss'],
})
export class BarTopComponent implements OnInit {
  public barHeight = gameBarHeight;

  constructor() {}

  ngOnInit(): void {}
}

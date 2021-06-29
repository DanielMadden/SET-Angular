import { Component, OnInit } from '@angular/core';
import { gameBarHeight } from 'src/app/shared/variables';

@Component({
  selector: 'app-bar-bottom-mobile',
  templateUrl: './bar-bottom-mobile.component.html',
  styleUrls: ['./bar-bottom-mobile.component.scss'],
})
export class BarBottomMobileComponent implements OnInit {
  public barHeight = gameBarHeight;

  constructor() {}

  ngOnInit(): void {}
}

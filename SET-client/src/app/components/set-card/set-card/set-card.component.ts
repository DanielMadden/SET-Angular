import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { cardPaths } from '../../../shared/card-attributes';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.scss'],
})
export class SetCardComponent implements OnInit {
  @Input() card: ICard = {
    count: 1,
    color: 1,
    shape: 'diamond',
    shade: 'hollow',
  };

  iconCountArray: any[] = [];
  cardPaths = cardPaths;

  constructor() {}

  ngOnInit(): void {
    this.iconCountArray = [...Array(this.card.count).keys()];
  }
}

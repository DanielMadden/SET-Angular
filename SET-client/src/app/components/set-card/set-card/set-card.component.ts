import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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

  @Input() cardSlot: number = 0;

  iconCountArray: any[] = [];
  cardPaths = cardPaths;

  constructor() {}

  ngOnInit(): void {
    this.iconCountArray = [...Array(this.card.count).keys()];
  }

  ngAfterViewInit(): void {
    let paths = document.getElementsByClassName(
      `set-card-${this.cardSlot}-svg-path`
    );
    for (let i = 0; i < paths.length; i++) {
      paths[i].setAttribute('d', 'M25 0 L50 50 L25 100 L0 50 Z');
    }
  }
}

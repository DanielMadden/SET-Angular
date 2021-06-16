import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ICard } from 'src/app/models/card';
import { cardPaths } from '../../../shared/card-attributes';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.scss'],
})
export class SetCardComponent implements AfterViewInit, OnChanges {
  @Input() card: ICard = {
    count: 1,
    color: 1,
    shape: 'diamond',
    shade: 'hollow',
  };

  @Input() inGameLog: boolean = false;
  @Input() gameLogId: number = 0;
  @Input() cardSlot: number = 0;
  @Input() highlighted: boolean = false;

  iconCountArray: any[] = [];
  cardPaths = cardPaths;

  constructor() {}

  ngAfterViewInit(): void {
    this.drawPaths();
  }

  ngOnChanges(): void {
    this.drawPaths();
  }

  private drawPaths(): void {
    let paths = document.getElementsByClassName(
      (this.inGameLog ? `game-log-${this.gameLogId}-` : '') +
        `set-card-${this.cardSlot}-svg-path`
    );
    for (let i = 0; i < paths.length; i++) {
      paths[i].setAttribute('d', cardPaths[this.card.shape].d);
      if (this.card.shade === 'striped')
        paths[i].setAttribute('fill', `url(#striped-${this.card.color})`);
    }
  }
}
